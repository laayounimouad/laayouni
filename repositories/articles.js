const {Article,Comment,Tag} = require('../models')

Validator = require('validatorjs');
module.exports = {
    /**
     * 
     * @returns all articles
     */
    async getAllArticles(){
      var results = await Article.findAll()
        return results;
    },
    /**
     * 
     * @param {default = 1} page 
     * @param {default = 10} limit 
     * @returns articles for each page
     */
    async getArticles(page = 1, limit = 10) {

        const startIndex = (page - 1) * limit
        const endIndex = page * limit
  
        const results = {}
       
        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit
          }
        }
  
        if (endIndex < await Article.count()) {
          results.next = {
            page: page + 1,
          limit: limit
          }
        }
        results.results =await Article.findAll({order:[['createdAt','DESC']], offset: startIndex, limit: limit });
        return results;
      },
/**
 * 
 * @param {Article id} id 
 * @returns 
 */
      getArticle(id) {
        return  Article.findByPk(id);
      },

      getCommentsByArticleId(id){
        return Comment.findAll({
            where: {
              ArticleId: id
            }
          })
      },
      getTagsByArticleId(id){
        return Tag.findAll({
            include:  [
                {
                    model:Article,
                    attributes:[],
                    where:{id:id}
                }
            ]
          });
      },
      async associateArticleAndTag(articleId,tagId){
        if(!articleId || !tagId) return "il faut avoir l'id d'article et du tag"
        var article = await Article.findByPk(articleId)
        if(!article) return "cet article n'existe pas"
        var tag = await Tag.findByPk(tagId)
        if(!tag) return "ce tag n'existe pas"

        article.addTag(tag);
        return "association reussi"
      },
/**
 * 
 * @param {Article Model} article
 * @returns 
 */
      async addArticle(article) {
   
        console.log(article);
        var articleTemp, validation, validationRules;
  
        validationRules = {
            title: 'required',
            content: 'required',
            UserId : 'required'
         };
        // validation du requete
          validation = new Validator(article, validationRules);
        // s'il y a une erreur :
        if (!validation.passes()) {
            return validation.errors.all();
        } else {
            articleTemp = (await Article.create(article));
            
            if (articleTemp) {
              if(article.tagsId){
                if(!Array.isArray(article.tagsId)){
                  await this.associateArticleAndTag(articleTemp.id,article.tagsId)
                }
                else{
                  for(var tagId of article.tagsId){
                    await this.associateArticleAndTag(articleTemp.id,tagId)
                }
              }
                
              }
              return  "Article nouvellement créé";
            }
        }
      },

      /**
       * 
       * @param {*} article 
       * @returns 
       */
      async updateArticle(article) {
   
        var articleTemp, validation, validationRules;
  
        validationRules = {
            id:'required',
            title: 'required',
            content: 'required'
         };
        // validation du requete
          validation = new Validator(article, validationRules);
        // s'il y a une erreur :
        if (!validation.passes()) {
            return validation.errors.all();
        } else {
            articleTemp = (await Article.update(
                {
                title: article.title,
                content :article.content,
              },
              {
                where: {
                  id: article.id
                }
              }));
              return  "Article nouvellement modifié";
        }
      },

      /**
       * 
       * @param {id} article 
       * @returns 
       */
      async deleteArticle(article) {
        if(!article.id){return "il faut un id pour supprimé l'article "}
        else{
        var temp = await Article.destroy({
          where:{
            id:article.id
          }
        })
        if(temp) return "article supprimé";
        }
      }





}