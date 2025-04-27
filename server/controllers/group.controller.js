import Group from "../models/group.model.js"
import Expense from "../models/expense.model.js";
import User from "../models/user.model.js"
import { nanoid } from 'nanoid';

export const createGroup = async (req, res) => {
  try {
    const { name, description } = req.body
    const createdBy = req.user._id
    const code = nanoid(8)
    const codeExpiresAt = new Date(Date.now() + 60 * 60 * 1000) // in 1 hour

    const newGroup = new Group({
      name,
      description,
      createdBy,
      members: [createdBy],
      code,
      codeExpiresAt
    })

    await newGroup.save()

    res.status(201).json({
      success: true,
      message: "Group created successfully!",
      group: newGroup,
    });

  } catch (err) {
    console.log("Error in creating group: ", err)
    res.status(500).json({
      error: err.message
    })
  }
}

export const joinGroup = async (req, res) => {
  try {
    const { code } = req.body
    const userId = req.user._id

    const group = await Group.findOne({ code })
    if (!group) {
      return res.status(404).json({
        message: 'Invalid Code'
      })
    }

    if (group.codeExpiresAt < new Date()) {
      return res.status(400).json({
        message: 'Code expired!'
      })
    }

    // Check if user already a member
    if (group.members.includes(userId)) {
      return res.status(400).json({ message: 'You are already a member of this group.' });
    }

    group.members.push(userId);
    await group.save();

    res.status(200).json({ message: 'Joined group successfully', group });
  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: 'Error in joining group!'
    })
  }

}

export const regenerateCode = async (req, res) => {
  try {
    const { groupId } = req.body;

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Only creator can regenerate
    if (group.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const newCode = nanoid(8);
    group.code = newCode;
    group.codeExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    await group.save();

    res.status(200).json({ message: 'Code regenerated', code: newCode });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};




export const deleteGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user._id;

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }

    if (group.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this group." });
    }

    // Delete all expenses associated with this group
    await Expense.deleteMany({ group: groupId });

    // Delete the group itself
    await Group.findByIdAndDelete(groupId);

    res.status(200).json({ message: "Group and its expenses deleted successfully." });
  } catch (error) {
    console.error("Error deleting group: ", error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};








