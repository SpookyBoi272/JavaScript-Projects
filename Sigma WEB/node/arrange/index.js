const fs = require('fs');

rawExtension = [];
mainDir = "./arrange/";


const getExtension = (fileName)=>{
    arr = fileName.split(".");
    return arr[arr.length-1];
}

//read files
files = fs.readdirSync(mainDir);
files.forEach((value)=>{
    rawExtension.push(getExtension(value));
});

extension = rawExtension.filter((value,index)=>{
  return rawExtension.indexOf(value) === index;
})

//make folders from extensions
extension.forEach((value,index)=>{
    try {
        fs.mkdirSync(mainDir+value);
        console.log("Making folders")
      } catch (err) {
        console.error(err);
      }    
})

//move files to new folders
files.forEach((value,index)=>{
    oldPath=mainDir+value
    newPath=mainDir+getExtension(value)+"/"+value
    fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('File moved successfully');
        }
      });
})