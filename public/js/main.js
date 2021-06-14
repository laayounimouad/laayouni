{
    /**
     * fill the table
     * @param {*} root 
     */
    var exampleForm ;
    var page = 1;
    var url;
    async function fillTable(root,url){
        const table = root.querySelector('.table-affichage_table');
        
        const response =await( await fetch(url) ).json();
        const data =  response.results;

        if(response.next){
            document.getElementById('next').setAttribute("onclick", "nextPage()");
            document.getElementById('next').removeAttribute("class");
        }
        else{
            document.getElementById('next').removeAttribute("onclick");
            document.getElementById('next').setAttribute("class", "disabled");
        }

        if(response.previous){
            document.getElementById('previous').setAttribute("onclick", "previousPage()");
            document.getElementById('previous').removeAttribute("class");
        }
        else{
            document.getElementById('previous').removeAttribute("onclick");
            document.getElementById('previous').setAttribute("class", "disabled");
        }

        //clear table 
        // table.querySelector(`thead tr`).innerHTML = "";
        // table.querySelector(`tbody`).innerHTML = ""

        table.innerHTML = `
        <thead>
        <tr></tr>
        </thead>
        <tbody>
        </tbody> 
    `;
        //console.log(data);
        //fill headers
        
    //     for (const header of data.headers){
    //        table.querySelector(`thead tr`).insertAdjacentHTML("beforeend",`<th>${header}</th>`);
    //    }
        
       var col = [];     
            for (var key in data[0]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                    table.querySelector(`thead tr`).insertAdjacentHTML("beforeend",`<th>${key}</th>`);
                }
            }
            table.querySelector(`thead tr`).insertAdjacentHTML("beforeend",`<th></th>`);
        /*
             for (const row of data.rows){
                 table.querySelector(`tbody`).insertAdjacentHTML("beforeend",`
                     <tr>
                         ${row.map(col => `<td>${col}</td>`).join("")}
                     </tr>
                 `);
             }
*/
            for (var i = 0; i < data.length; i++) {

                tr = table.insertRow(-1);
    
                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = data[i][col[j]];    
                }
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML =` <button type="button" onclick="modify(${data[i][col[0]]})" class="btn btn-success">modifier</button>`
            }
    }
    
async function handleFormSubmit(event) {
        event.preventDefault();
    
        const form = event.currentTarget;
    
        const url = form.action;
    
        try {
        
            const formData = new FormData(form);
            const responseData = await postFormDataAsJson({ url, formData });
    
            console.log({ responseData });
    
        } catch (error) {
            console.error(error);
        }
    }
    async function postFormDataAsJson({ url, formData }) {
        
        const plainFormData = Object.fromEntries(formData.entries());
        const formDataJsonString = JSON.stringify(plainFormData);
    
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: formDataJsonString,
        };
    
        const response = await fetch(url, fetchOptions);
    /*
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    */
        const form = document.querySelector(".ajout");
        form.innerHTML = `<h3 style="margin-left: 40%;"> utilisateur ajouté avec succes</h3`
        return response.json();
    }
    function modify(id){
        const form = document.querySelector(".ajout");
        form.innerHTML
    }
    function add(){
        const form = document.querySelector(".ajout");
        form.innerHTML=`
        <div class="container">
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <form action="/users" method="POST" id="form-user">
        <div class="control-group">
          <div class="form-group floating-label-form-group controls">
            <label>Username</label>
            <input type="text" name="username" placeholder="Username" class="form-control">
          </div>
        </div>
        <div class="control-group">
          <div class="form-group floating-label-form-group controls">
            <label>Email</label>
            <input type="email" name="email" placeholder="Email" class="form-control">
          </div>
        </div>
        <div class="control-group">
          <div class="form-group floating-label-form-group controls">
            <label>Password</label>
            <input type="password" name="password" placeholder="Password" class="form-control">
          </div>
        </div>
        <div class="control-group">
            <div class="form-group floating-label-form-group controls">
              <label class="form-label">Role</label>
              <select id="role" name="role" class="form-select">
                <option value="admin">admin</option>
                <option value="author">author</option>
                <option value="guest">guest</option>
              </select>
            </div>
          </div>
          
        <div class="form-group my-4 text-center">
          <button type="submit" class="btn btn-primary">Enregistrer</button>
          
        </div>
      </form>
    </div>
  </div>
</div>
        `

        exampleForm = document.getElementById("form-user");
        exampleForm.addEventListener("submit", handleFormSubmit);
    }
    // for(const root of document.querySelectorAll(".table-affichage[data-url]")){
        const root = document.querySelector(".table-affichage[data-url]");
        const table =document.createElement("table");
        url = root.dataset.url;
        table.classList.add('table-affichage_table');
        table.innerHTML = `
            <thead>
            <tr></tr>
            </thead>
            <tbody>
            <tr>
            <td>Loading</td>
            </tr>
            </tbody> 
        `;
        root.append(table);
        fillTable(root,url);
    // }
    function previousPage(){
        page = parseInt(page)-1;
        url = `/users?page=${page}&limit=10`;
        console.log(`url :::: ${url}`);
        fillTable(root,url);
    }
    function nextPage(){
        page = parseInt(page)+1;
        url = `/users?page=${page}&limit=10`;
        console.log(`url :::: ${url}`);
        fillTable(root,url);
    }
}