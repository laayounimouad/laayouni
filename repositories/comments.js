const {Comment} = require('../models')

Validator = require('validatorjs');
module.exports = {
    /**
     * 
     * @returns all comments
     */
    getAllComments(){
        return Comment.findAll()
    },
    /**
     * 
     * @param {default = 1} page 
     * @param {default = 10} limit 
     * @returns comments for each page
     */
    async getComments(page = 1, limit = 10) {

        const startIndex = (page - 1) * limit
        const endIndex = page * limit
  
        const results = {}
       
        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit
          }
        }
  
        if (endIndex < await Comment.count()) {
          results.next = {
            page: page + 1,
          limit: limit
          }
        }
        results.results =await Comment.findAll({ offset: startIndex, limit: limit });
        
        return results;
      },
/**
 * 
 * @param {comment id} id 
 * @returns 
 */
      getComment(id) {
        return  Comment.findByPk(id);
      },
/**
 * 
 * @param {Comment Model} comment
 * @returns 
 */
      async addComment(comment) {
   
        var commentTemp, validation, validationRules;
  
        validationRules = {
            content: 'required',
            ArticleId : 'required'
         };
        // validation du requete
          validation = new Validator(comment, validationRules);
        // s'il y a une erreur :
        if (!validation.passes()) {
            return validation.errors.all();
        } else {
            commentTemp = (await Comment.create(comment));
  
            if (commentTemp) {
              return  "comment nouvellement créé";
            }
        }
      },

      /**
       * 
       * @param {*} comment 
       * @returns 
       */
      async updateComment(comment) {
   
        var commentTemp, validation, validationRules;
  
        validationRules = {
            id:'required',
            content: 'required'
         };
        // validation du requete
          validation = new Validator(comment, validationRules);
        // s'il y a une erreur :
        if (!validation.passes()) {
            return validation.errors.all();
        } else {
            commentTemp = (await Comment.update(
                {
                content :comment.content,
              },
              {
                where: {
                  id: comment.id
                }
              }));
              return  "comment nouvellement modifié";
        }
      },

      /**
       * 
       * @param {id} comment 
       * @returns 
       */
      async deleteComment(comment) {
        if(!comment.id) return "il faut un id pour supprimé le commentaire"
        else{
        var temp = await Comment.destroy({
          where:{
            id:comment.id
          }
        })
        if(temp) return "Comment supprimé";
        }
      }

}