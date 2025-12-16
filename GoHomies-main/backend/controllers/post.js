const Post = require("../models/post")

async function CreateNewPost(req,res){
    try {
        const {destination,totalPersons,TravelMonth,BudgetPerPerson,description} = req.body;
        const userId = req.user._id
        let imageData = null;

        if (req.file) {
            imageData = req.file.buffer.toString('base64');
            imageData = `data:${req.file.mimetype};base64,${imageData}`;
        }

        const newPost = await Post.create({
            destination,
            totalPersons: Number(totalPersons),
            TravelMonth,
            BudgetPerPerson: Number(BudgetPerPerson),
            description,
            userId,
            image:imageData
        })

        return res.status(201).json({msg:"Post Created Successfully", post: newPost})
    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({msg: "Failed to create post", error: error.message})
    }
}

async function getAllPost(req,res){
    try {
        const { destination, difficulty, sort } = req.query;
        let filter = { status: { $ne: 'cancelled' } };

        if (destination) {
            filter.destination = { $regex: destination, $options: 'i' };
        }
        if (difficulty) {
            filter.difficulty = difficulty;
        }

        let query = Post.find(filter)
            .populate("userId", 'name email username about designation title profileImage bio location')
            .populate("interested_persons", '_id name username profileImage');

        if (sort === 'recent') {
            query = query.sort({ createdAt: -1 });
        } else if (sort === 'trending') {
            query = query.sort({ likeCount: -1, createdAt: -1 });
        } else if (sort === 'budget') {
            query = query.sort({ BudgetPerPerson: 1 });
        } else {
            query = query.sort({ createdAt: -1 });
        }

        const posts = await query;

        return res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return res.status(500).json({msg:"Something Went wrong", error: error.message})
    }
}

// Opt-in function
async function optInToPost(req, res) {
    const postId = req.params.postId;
    const userId = req.user._id;

    try {
        const post = await Post.findById(postId);

        if (!post) return res.status(404).json({ msg: "Post not found" });

        if (!post.interested_persons.includes(userId)) {
            post.interested_persons.push(userId);
            await post.save();
        }

        const populatedPost = await post.populate('interested_persons', '_id name username profileImage');

        return res.status(200).json({ 
            msg: "Opted in successfully",
            interested_persons: populatedPost.interested_persons 
        });
    } catch (err) {
        return res.status(500).json({ msg: "Error opting in", error: err.message });
    }
}

// Opt-out function
async function optOutFromPost(req, res) {
    const postId = req.params.postId;
    const userId = req.user._id;

    try {
        const post = await Post.findById(postId);

        if (!post) return res.status(404).json({ msg: "Post not found" });

        post.interested_persons = post.interested_persons.filter(
            (id) => id.toString() !== userId.toString()
        );

        await post.save();

        const populatedPost = await post.populate('interested_persons', '_id name username profileImage');

        return res.status(200).json({ 
            msg: "Opted out successfully",
            interested_persons: populatedPost.interested_persons 
        });
    } catch (err) {
        return res.status(500).json({ msg: "Error opting out", error: err.message });
    }
}

async function likePost(req, res) {
    const postId = req.params.postId;
    const userId = req.user._id;

    try {
        const post = await Post.findById(postId);

        if (!post) return res.status(404).json({ msg: "Post not found" });

        if (!post.likes.includes(userId)) {
            post.likes.push(userId);
            post.likeCount = (post.likeCount || 0) + 1;
            await post.save();
        }

        return res.status(200).json({ 
            msg: "Post liked successfully",
            likeCount: post.likeCount 
        });
    } catch (err) {
        return res.status(500).json({ msg: "Error liking post", error: err.message });
    }
}

async function unlikePost(req, res) {
    const postId = req.params.postId;
    const userId = req.user._id;

    try {
        const post = await Post.findById(postId);

        if (!post) return res.status(404).json({ msg: "Post not found" });

        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter(id => id.toString() !== userId.toString());
            post.likeCount = Math.max(0, (post.likeCount || 0) - 1);
            await post.save();
        }

        return res.status(200).json({ 
            msg: "Post unliked successfully",
            likeCount: post.likeCount 
        });
    } catch (err) {
        return res.status(500).json({ msg: "Error unliking post", error: err.message });
    }
}

async function addCommentToPost(req, res) {
    const postId = req.params.postId;
    const userId = req.user._id;
    const { comment } = req.body;

    try {
        if (!comment || !comment.trim()) {
            return res.status(400).json({ msg: "Comment cannot be empty" });
        }

        const post = await Post.findById(postId);

        if (!post) return res.status(404).json({ msg: "Post not found" });

        post.comments.push({
            userId,
            comment: comment.trim(),
            createdAt: new Date()
        });

        await post.save();

        const populatedPost = await post.populate('comments.userId', 'name username profileImage');

        return res.status(200).json({ 
            msg: "Comment added successfully",
            comments: populatedPost.comments 
        });
    } catch (err) {
        return res.status(500).json({ msg: "Error adding comment", error: err.message });
    }
}

module.exports = {CreateNewPost,getAllPost,optInToPost,optOutFromPost,likePost,unlikePost,addCommentToPost}