https://www.apollographql.com/docs/tutorial/introduction

Setting up the create-react-scripts like ReactJS application was a breeze. 

We did not use the create-react-scripts to set up the ReactJS application. The idea was to see what it takes to set up a create-react-app like application without using the create-react-app. 
The src folder was set up similar to the create-react-app structure.

client
  |
  |--src
  |
  |--package.json 
  |
  |--node-modules


Next step was to set up a package.json file in the root (same level as source).  To experiment, an existing package.json was used. 
npm install was all took to install the dependencies and the devDependencies.

The packages included react, react dom and importantly react-scripts which has the start, build, test and eject commands which are defined in the scripts section of package.json.

Now that package.json is set up and react-scripts are available, gave a nmp start from command line.

As expected, it wanted the other files of the recommended folder structure to be provided.

so set up the public folder with index.html (with root defined for react DOM to mount) inside it as under:


client
  |
  |--src
  |
  |--package.json 
  |
  |--node-modules
  |
  |--public
	|
	|--index.html

That is it!! The page loaded.

While create-react-app is closed to deployment and packaging modifications with regard to webpack and babel, the pre-defined structure makes it easy to set it up easily.

Of course, we still dont have create-react-app installed to generate other react apps. But you know how to do!!

Give it a try!!