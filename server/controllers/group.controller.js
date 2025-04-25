import Group from "../models/group.model"
import User from "../models/user.model"

export const createGroup = async (req, res) => {
    try {
        const { name, description } = req.body
        const newGroup = new Group({
            name,
            description,
            createdBy: req.user._id,
            members: [req.user._id]

        })

        await newGroup.save()
        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { groups: newGroup._id } },
            { new: true }
        )

        res.status(201).json({
            success: true,
            message: "Group created successfully!",
            group: newGroup
        });

    } catch (err) {
        console.log("Error in creating group: ", err)
        res.status(500).json({
            error: err.message 
        }) 
    }
}