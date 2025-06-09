const { CollegeName, HostelName } = require("../models/AuthModel");

const getCollege = async(req, res)=>{
    try{
        const collegeOptions = await CollegeName.find();
        res.json(collegeOptions.map(option => option.name));
    }catch(error){
        res.status(500).json({ message: "Error fetching options", error });
    }
}

const addCollege = async(req, res)=>{
    try{
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: "Option name is required" });
        await CollegeName.create({ name });
        res.status(201).json({ message: "Option added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding option", error });
    }
}

const getHostel = async(req, res)=>{
    try{
        const hostelOptions = await HostelName.find();
        res.json(hostelOptions.map(option => option.name));
    } catch(error){
        res.status(500).json({ message: "Error fetching options", error });
    }
}

const addHostel = async(req, res)=>{
    try{
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: "Option name is required" });
        await HostelName.create({ name });
        res.status(201).json({ message: "Option added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding option", error });
    }
}

module.exports = {
    getCollege,
    addCollege,
    getHostel,
    addHostel
}