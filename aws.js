const AWS = require("aws-sdk");
// Set the region \
AWS.config.update({
    region:"<AWS_REGION>",
accessKeyId:"<access key>",
secretAccessKey:"<Access Key>",
  });
// Load Mime Type for Node.js
const mime = require("mime-types");
const uuidv1 = require("uuid/v1");

const s3Bucket = new AWS.S3({apiVersion: '2006-03-01'});
const deleteFile =(image)=>{
  
  return new Promise((resolve,reject)=>{
    if(!image){
      resolve(true)
    }
    let imgArray=image.split('/');
  let imageKey=imgArray[imgArray.length-2]+imgArray[imgArray.length-1];
    let params = {
      Bucket: "<bucketname>",
      Delete:{Objects:[{Key: imageKey+'.png'}]}
    };
    s3Bucket.deleteObjects(params,function(err,data){
      if(err) {console.log(err,err.stack)
      reject(err)
    }
    else{
      resolve(data);
    }
    })
  })
}
const generateFileName = (image, userName,type,vendor_id) => {
  let newImage = new Buffer(
    image.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  let folder_name='vendor_user/';
  if(type!='avatar'){
    folder_name='vendor_place_photos/'+vendor_id+'/';
  }
  let params = {
    Bucket: "<bucketname>",
    Key: folder_name+userName.substring(0,2) + uuidv1(),
    Body: newImage,
    ContentEncoding: "base64",
    ContentType: "image/png"
  };
  console.log(params.Key);
  return new Promise((resolve, reject) => {
    s3Bucket.putObject(params, function(err, data) {
      if (err) {
        console.log(err);
        console.log("Error uploading data: ", data);
        reject(err);
      } else {
          console.log(data.Location);
        console.log("succesfully uploaded the image!" );
        resolve({url:'<url>'+params.Key});

      }
    });
  });
};

const generateRecordName = (file, pet_id,type,sub_folder_name='records/') => {
  let newImage = new Buffer(
    file.replace(/^data:[a-zA-Z]+\/\w+;base64,/, ""),
    "base64"
  );
  let folder_name=sub_folder_name+pet_id+'/';
  
  let params = {
    Bucket: "<bucketname>",
    Key: folder_name+ uuidv1(),
    Body: newImage,
    ContentEncoding: "base64",
    ContentType: type
  };
  console.log(params.Key);
  return new Promise((resolve, reject) => {
    s3Bucket.putObject(params, function(err, data) {
      if (err) {
        console.log(err);
        console.log("Error uploading data: ", data);
        reject(err);
      } else {
          console.log(data.Location);
        console.log("succesfully uploaded the image!" );
        resolve({url:'url'+params.Key});

      }
    });
  });
};

const generateFileName2 = (image) => {
  let newImage = new Buffer(
    image.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  let folder_name='tobedeleted/';
  
  let params = {
    Bucket: "bucket name",
    Key: folder_name+uuidv1(),
    Body: newImage,
    ContentEncoding: "base64",
    ContentType: "image/png"
  };
  console.log(params.Key);
  return new Promise((resolve, reject) => {
    s3Bucket.putObject(params, function(err, data) {
      if (err) {
        console.log(err);
        console.log("Error uploading data: ", data);
        reject(err);
      } else {
          console.log(data.Location);
        console.log("succesfully uploaded the image!" );
        resolve({url:'url'+params.Key});

      }
    });
  });
};

const generateProductPhoto=(image,vendor_id)=>{
  let newImage = new Buffer(
    image.replace(/^data:[a-zA-Z]+\/\w+;base64,/, ""),
    "base64"
  );
  let folder_name=sub_folder_name+vendor_id+'/';
  
  let params = {
    Bucket: "<bucketname>",
    Key: folder_name+ uuidv1(),
    Body: newImage,
    ContentEncoding: "base64",
    ContentType: "image/png"
  };
  console.log(params.Key);
  return new Promise((resolve, reject) => {
    s3Bucket.putObject(params, function(err, data) {
      if (err) {
        console.log(err);
        console.log("Error uploading data: ", data);
        reject(err);
      } else {
          console.log(data.Location);
        console.log("succesfully uploaded the image!" );
        resolve({url:'bucket url'+params.Key});

      }
    });
  });
};

module.exports = { generateFileName,deleteFile,generateFileName2,generateRecordName,generateProductPhoto};
