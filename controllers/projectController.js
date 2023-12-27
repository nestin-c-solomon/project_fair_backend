
//import projectSchema
const projects = require('../Models/projectSchema')


//add project
exports.addProject = async(req,res)=>{
    console.log('Inside addproject request');
    const userId = req.payload
    console.log(userId);

    const projectImage = req.file.filename
    /* console.log(projectImage); */
    const {title, language, github, website,overview} = req.body
    console.log(title, language, github, website,overview, projectImage);

    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(401).json('Project already exist. Upload new project')
        }
        else{
            const newProject = new projects({
                title,language,github,website,overview,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch(err){
        res.status(401).json(`request failed due to ${err}`)
    }                                                                          
}

//getHomeProject
exports.getHomeProject = async(req,res)=>{
    try {
        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject) 
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`)
    }
}

//getAllProject
exports.getAllProject = async(req,res)=>{
    const searchKey = req.query.search
    console.log(searchKey);

    const query = {
        language:{
            //regular expression, option--> to remove case sensitivity 
            $regex:searchKey, $options:'i'
        }
    }
    try {
        const allProject = await projects.find(query)
        res.status(200).json(allProject)  
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`)
    }
}


//getUserProject
exports.getUserProject = async(req,res)=>{
    userId = req.payload
    try {
        const allUserProject = await projects.find({userId})
        res.status(200).json(allUserProject)  
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`)
    }
}