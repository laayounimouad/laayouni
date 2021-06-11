const {Article,Tag} = require('../models')

Validator = require('validatorjs');
module.exports = {
    /**
     * 
     * @returns all tags
     */
    getAllTags(){
        return Tag.findAll()
    },
    /**
     * 
     * @param {default = 1} page 
     * @param {default = 10} limit 
     * @returns tags for each page
     */
    async getTags(page = 1, limit = 10) {

        const startIndex = (page - 1) * limit
        const endIndex = page * limit
  
        const results = {}
       
        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit
          }
        }
  
        if (endIndex < await Tag.count()) {
          results.next = {
            page: page + 1,
          limit: limit
          }
        }
        results.results =await Tag.findAll({ offset: startIndex, limit: limit });
        return results;
      },
/**
 * 
 * @param {Tag id} id 
 * @returns 
 */
      getTag(id) {
        return  Tag.findByPk(id);
      },

      getArticlesByTagId(id){
        return  Article.findAll({
            include:  [
                {
                    model:Tag,
                    attributes:[],
                    where:{id:id}
                }
            ]
          });
        
      },
/**
 * 
 * @param {Tag Model} tag
 * @returns 
 */
      async addTag(tag) {
   
        var tagTemp, validation, validationRules;
  
        validationRules = {
            name:'required'
         };
        // validation du requete
          validation = new Validator(tag, validationRules);
        // s'il y a une erreur :
        if (!validation.passes()) {
            return validation.errors.all();
        } else {
            tagTemp = (await Tag.create(tag));
  
            if (tagTemp) {
              return  "Tag nouvellement créé";
            }
        }
      },

      /**
       * 
       * @param {*} tag 
       * @returns 
       */
      async updateTag(tag) {
   
        var tagTemp, validation, validationRules;
  
        validationRules = {
            id:'required',
            name:'required'
         };
        // validation du requete
          validation = new Validator(tag, validationRules);
        // s'il y a une erreur :
        if (!validation.passes()) {
            return validation.errors.all();
        } else {
            tagTemp = (await Tag.update(
                {
                name:tag.name
              },
              {
                where: {
                  id: tag.id
                }
              }));
              return  "Tag nouvellement modifié";
        }
      },

      /**
       * 
       * @param {id} tag 
       * @returns 
       */
      async deleteTag(tag) {
        if(!tag.id){return "il faut un id pour supprimé le tag "}
        else{
        var temp = await Tag.destroy({
          where:{
            id:tag.id
          }
        })
        if(temp) return "tag supprimé";
        }
      }
}