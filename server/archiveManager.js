const fs = require("fs")

const archiveManager = {
    /**
     * save a content in a file
     * @param {string} locale - file directory
     * @param {Object} content - content to be saved (JSON)
     */
    Put: (locale,content) => {
        fs.writeFileSync(locale,JSON.stringify(content))
        return true
    },
    /**
     * pull the content of a file
     * @param {string} locale - file directory
     */
    Pull: (locale) => {
        return JSON.parse(fs.readFileSync(locale))
    },
    /**
     * delete a file
     * @param {string} locale - file directory
     */
    Delete: (locale) => {
        fs.unlink(locale,(err) =>{
            if(err){
                return {"error" : err}
            }
            return true
        })
    },
    /**
     * read all files in the directory
     * @param {string} locale - directory
     */
    ReadDirectory: (locale) => {
        const files = fs.readdirSync(locale);
        const conteudoDoDiretorio = { files };

        return JSON.stringify(conteudoDoDiretorio, null, 2)
    }
}

module.exports = archiveManager