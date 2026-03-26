/* -------- EQUIPMENT -------- */
let gm_equipments=[];

function gm_addEquip(){
    let name=document.getElementById("gm_equipName").value;
    let status=document.getElementById("gm_equipStatus").value;

    gm_equipments.push({name,status});
    gm_renderEquip();
}

function gm_changeStatus(i){
    gm_equipments[i].status =
        gm_equipments[i].status === "Working" ? "Repair" : "Working";
    gm_renderEquip();
}

function gm_renderEquip(){
    let html="";
    gm_equipments.forEach((e,i)=>{
        html+=`
        <tr>
        <td>${e.name}</td>
        <td>${e.status}</td>
        <td><button onclick="gm_changeStatus(${i})">Change</button></td>
        </tr>`;
    });
    document.getElementById("gm_equipList").innerHTML=html;
}
/* -------- MEMBERS -------- */
let gm_members=[];

function gm_addMember(){
    let name=document.getElementById("gm_memberName").value;
    let start=document.getElementById("gm_startDate").value;
    let days=document.getElementById("gm_days").value;

    gm_members.push({name,start,days});
    gm_renderMember();
}

function gm_renderMember(){
    let today=new Date();
    let html="";

    gm_members.forEach(m=>{
        let start=new Date(m.start);
        let diff=Math.floor((today-start)/(1000*60*60*24));
        let left=m.days-diff;

        let status = left>0 ? "Active" : "Expired";
        let className = left>0 ? "gm_active" : "gm_expired";

        html+=`
        <tr>
        <td>${m.name}</td>
        <td>${left>0?left:0}</td>
        <td class="${className}">${status}</td>
        </tr>`;
    });

    document.getElementById("gm_memberList").innerHTML=html;
}
/* -------- TRAINERS -------- */
let gm_trainers=[];

function gm_addTrainer(){
    let name=document.getElementById("gm_trainerName").value;
    let hours=document.getElementById("gm_hours").value;
    let payment=document.getElementById("gm_payment").value;

    gm_trainers.push({name,hours,payment});
    gm_renderTrainer();
}

function gm_renderTrainer(){
    let html="";
    gm_trainers.forEach(t=>{
        html+=`
        <tr>
        <td>${t.name}</td>
        <td>${t.hours}</td>
        <td>${t.payment}</td>
        </tr>`;
    });

    document.getElementById("gm_trainerList").innerHTML=html;
}