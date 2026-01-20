let form=document.getElementById("problemForm");
let problemListDiv=document.getElementById("problemList");

/* Load from LocalStorage */
let problems=[];
let storedProblems=localStorage.getItem("problems");
if(storedProblems!==null)
{
    problems=JSON.parse(storedProblems);
}

/* Save to LocalStorage */
function saveProblems()
{
    localStorage.setItem("problems",JSON.stringify(problems));
}

/* Handle form submit */
form.addEventListener("submit",function(event)
{
    event.preventDefault();

    let problemName=document.getElementById("problemName").value;
    let topic=document.getElementById("topic").value;
    let difficulty=document.getElementById("difficulty").value;

    let problem={
        name:problemName,
        topic:topic,
        difficulty:difficulty,
        status:"Unsolved"
    };

    problems.push(problem);
    saveProblems();
    renderProblems();
    form.reset();
});

/* Render problems */
function renderProblems()
{
    problemListDiv.innerHTML="<p>Problem List:</p>";

    for(let i=0;i<problems.length;i++)
    {
        let p=problems[i];

        let card=document.createElement("div");

        let text=document.createElement("span");
        text.textContent=
            p.name+" | "+
            p.topic+" | "+
            p.difficulty+" | "+
            p.status;

        if(p.status==="Solved")
        {
            text.classList.add("solved");
        }
        else
        {
            text.classList.add("unsolved");
        }

        let toggleButton=document.createElement("button");
        toggleButton.textContent="Toggle Status";
        toggleButton.addEventListener("click",function()
        {
            if(p.status==="Unsolved")
            {
                p.status="Solved";
            }
            else
            {
                p.status="Unsolved";
            }
            saveProblems();
            renderProblems();
        });

        let deleteButton=document.createElement("button");
        deleteButton.textContent="Delete";
        deleteButton.addEventListener("click",function()
        {
            problems.splice(i,1);
            saveProblems();
            renderProblems();
        });

        let actions=document.createElement("div");
        actions.className="actions";
        actions.appendChild(toggleButton);
        actions.appendChild(deleteButton);

        card.appendChild(text);
        card.appendChild(actions);
        problemListDiv.appendChild(card);
    }
}

/* Initial render */
renderProblems();
