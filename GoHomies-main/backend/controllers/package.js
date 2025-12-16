const Package = require("../models/package");
const User = require("../models/user");

async function createPackage(req, res) {
    try {
        const { name, destination, description, duration, durationUnit, basePrice, currency, 
                minPersons, maxPersons, inclusions, exclusions, amenities, highlights, itinerary } = req.body;

        if (!name || !destination || !description || !basePrice || !minPersons || !maxPersons) {
            return res.status(400).json({ msg: "Missing required fields" });
        }

        let coverImage = null;
        if (req.file) {
            coverImage = req.file.buffer.toString('base64');
            coverImage = `data:${req.file.mimetype};base64,${coverImage}`;
        }

        const newPackage = await Package.create({
            name,
            destination,
            description,
            duration,
            durationUnit,
            basePrice: Number(basePrice),
            currency,
            groupSize: {
                minPersons: Number(minPersons),
                maxPersons: Number(maxPersons)
            },
            inclusions: inclusions ? JSON.parse(inclusions) : [],
            exclusions: exclusions ? JSON.parse(exclusions) : [],
            amenities: amenities ? JSON.parse(amenities) : [],
            highlights: highlights ? JSON.parse(highlights) : [],
            itinerary: itinerary ? JSON.parse(itinerary) : [],
            coverImage,
            createdBy: req.user._id
        });

        return res.status(201).json({ msg: "Package created successfully", package: newPackage });
    } catch (error) {
        console.error("Error creating package:", error);
        return res.status(500).json({ msg: "Failed to create package", error: error.message });
    }
}

async function getAllPackages(req, res) {
    try {
        const { destination, difficulty, priceMin, priceMax, sort } = req.query;
        let filter = { isActive: true };

        if (destination) {
            filter.destination = { $regex: destination, $options: 'i' };
        }
        if (difficulty) {
            filter.difficulty = difficulty;
        }
        if (priceMin || priceMax) {
            filter.basePrice = {};
            if (priceMin) filter.basePrice.$gte = Number(priceMin);
            if (priceMax) filter.basePrice.$lte = Number(priceMax);
        }

        let query = Package.find(filter).populate('createdBy', 'name username profileImage');

        if (sort === 'price') {
            query = query.sort({ basePrice: 1 });
        } else if (sort === 'rating') {
            query = query.sort({ rating: -1 });
        } else {
            query = query.sort({ createdAt: -1 });
        }

        const packages = await query;

        return res.status(200).json(packages);
    } catch (error) {
        console.error("Error fetching packages:", error);
        return res.status(500).json({ msg: "Failed to fetch packages", error: error.message });
    }
}

async function getPackageById(req, res) {
    try {
        const { id } = req.params;

        const pkg = await Package.findById(id)
            .populate('createdBy', 'name username profileImage bio')
            .populate('reviews.userId', 'name username profileImage');

        if (!pkg) {
            return res.status(404).json({ msg: "Package not found" });
        }

        return res.status(200).json(pkg);
    } catch (error) {
        console.error("Error fetching package:", error);
        return res.status(500).json({ msg: "Failed to fetch package", error: error.message });
    }
}

async function addReview(req, res) {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user._id;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ msg: "Rating must be between 1 and 5" });
        }

        const pkg = await Package.findById(id);

        if (!pkg) {
            return res.status(404).json({ msg: "Package not found" });
        }

        const user = await User.findById(userId);

        pkg.reviews.push({
            userId,
            username: user.username,
            rating,
            comment
        });

        const avgRating = pkg.reviews.reduce((sum, review) => sum + review.rating, 0) / pkg.reviews.length;
        pkg.rating = Math.round(avgRating * 10) / 10;

        await pkg.save();

        return res.status(200).json({ msg: "Review added successfully", package: pkg });
    } catch (error) {
        console.error("Error adding review:", error);
        return res.status(500).json({ msg: "Failed to add review", error: error.message });
    }
}

async function savePackage(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const pkg = await Package.findById(id);
        if (!pkg) {
            return res.status(404).json({ msg: "Package not found" });
        }

        if (!user.savedPackages.includes(id)) {
            user.savedPackages.push(id);
            await user.save();
        }

        return res.status(200).json({ msg: "Package saved successfully" });
    } catch (error) {
        console.error("Error saving package:", error);
        return res.status(500).json({ msg: "Failed to save package", error: error.message });
    }
}

async function unsavePackage(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        user.savedPackages = user.savedPackages.filter(pkg => pkg.toString() !== id);
        await user.save();

        return res.status(200).json({ msg: "Package removed from saved" });
    } catch (error) {
        console.error("Error unsaving package:", error);
        return res.status(500).json({ msg: "Failed to unsave package", error: error.message });
    }
}

async function comparePackages(req, res) {
    try {
        const { ids } = req.query;

        if (!ids || !Array.isArray(ids) || ids.length < 2) {
            return res.status(400).json({ msg: "Provide at least 2 package IDs for comparison" });
        }

        const packages = await Package.find({ _id: { $in: ids } });

        if (packages.length < 2) {
            return res.status(400).json({ msg: "Not all packages found" });
        }

        return res.status(200).json({ packages });
    } catch (error) {
        console.error("Error comparing packages:", error);
        return res.status(500).json({ msg: "Failed to compare packages", error: error.message });
    }
}

module.exports = {
    createPackage,
    getAllPackages,
    getPackageById,
    addReview,
    savePackage,
    unsavePackage,
    comparePackages
};
