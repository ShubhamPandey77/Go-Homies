const Vlog = require("../models/vlog");

async function createVlog(req, res) {
    try {
        const { title, description, videoUrl } = req.body;
        const userId = req.user._id;

        if (!title || !description || !videoUrl) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const newVlog = await Vlog.create({
            title,
            description,
            videoUrl,
            userId
        });

        const vlogWithUser = await newVlog.populate('userId', 'name username profileImage');

        return res.status(201).json({ 
            msg: "Vlog created successfully", 
            vlog: vlogWithUser 
        });
    } catch (error) {
        console.error("Error creating vlog:", error);
        return res.status(500).json({ msg: "Failed to create vlog", error: error.message });
    }
}

async function getAllVlogs(req, res) {
    try {
        const vlogs = await Vlog.find()
            .populate('userId', 'name email username about designation title profileImage bio location')
            .sort({ createdAt: -1 });

        return res.status(200).json(vlogs);
    } catch (error) {
        console.error("Error fetching vlogs:", error);
        return res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
}

async function likeVlog(req, res) {
    const vlogId = req.params.vlogId;
    const userId = req.user._id;

    try {
        const vlog = await Vlog.findById(vlogId);

        if (!vlog) return res.status(404).json({ msg: "Vlog not found" });

        if (!vlog.likes.includes(userId)) {
            vlog.likes.push(userId);
            vlog.likeCount = (vlog.likeCount || 0) + 1;
            await vlog.save();
        }

        return res.status(200).json({ 
            msg: "Vlog liked successfully",
            likeCount: vlog.likeCount 
        });
    } catch (err) {
        return res.status(500).json({ msg: "Error liking vlog", error: err.message });
    }
}

async function unlikeVlog(req, res) {
    const vlogId = req.params.vlogId;
    const userId = req.user._id;

    try {
        const vlog = await Vlog.findById(vlogId);

        if (!vlog) return res.status(404).json({ msg: "Vlog not found" });

        if (vlog.likes.includes(userId)) {
            vlog.likes = vlog.likes.filter(id => id.toString() !== userId.toString());
            vlog.likeCount = Math.max(0, (vlog.likeCount || 0) - 1);
            await vlog.save();
        }

        return res.status(200).json({ 
            msg: "Vlog unliked successfully",
            likeCount: vlog.likeCount 
        });
    } catch (err) {
        return res.status(500).json({ msg: "Error unliking vlog", error: err.message });
    }
}

async function addCommentToVlog(req, res) {
    const vlogId = req.params.vlogId;
    const userId = req.user._id;
    const { comment } = req.body;

    try {
        if (!comment || !comment.trim()) {
            return res.status(400).json({ msg: "Comment cannot be empty" });
        }

        const vlog = await Vlog.findById(vlogId);

        if (!vlog) return res.status(404).json({ msg: "Vlog not found" });

        vlog.comments.push({
            userId,
            comment: comment.trim(),
            createdAt: new Date()
        });

        await vlog.save();

        const populatedVlog = await vlog.populate('comments.userId', 'name username profileImage');

        return res.status(200).json({ 
            msg: "Comment added successfully",
            comments: populatedVlog.comments 
        });
    } catch (err) {
        return res.status(500).json({ msg: "Error adding comment", error: err.message });
    }
}

module.exports = { createVlog, getAllVlogs, likeVlog, unlikeVlog, addCommentToVlog };
