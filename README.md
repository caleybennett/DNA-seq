## DNA view
This is a front end UI, where scientists can view, update, and validate DNA sequences. It is built using React framework. It has two views, an add sequence view, where a user can add unique sequences that have valid DNA characters. This app uses local storage to store entered data. The other view is where a user can view entered DNA sequences. A user can search through the sequences according to name, and sort them alphabetically. When a user clicks on a truncated sequence, a modal shows the entire sequence, color coded according to nucleotide. A user can also download a JSON file of the sequences

The most difficult part of this challenge for me was learning how to use local storage. My first day working on this challege I made the mistake of downloading an npm package for local storage which kept imbedding the objects deeper and deeper. After doing some more reasearch I learned that I didn't have to import local storage, I just had to declare it as a global variable.

## Future Goals
Looking forward I would like to build a backend to this application in rails, so I would be able to CRUD on a DNA sequence resource.
