{
    /**
     * fill the table
     * @param {*} root 
     */

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
        
            // for (const row of data.rows){
            //     table.querySelector(`tbody`).insertAdjacentHTML("beforeend",`
            //         <tr>
            //             ${row.map(col => `<td>${col}</td>`).join("")}
            //         </tr>
            //     `);
            // }

            for (var i = 0; i < data.length; i++) {

                tr = table.insertRow(-1);
    
                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = data[i][col[j]];    
                }
            }
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
    function highlightRow(row) {
        console.log("eqfdqsf");
      }
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