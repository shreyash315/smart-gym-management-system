/* -------- EQUIPMENT -------- */
let gm_equipments = [];

function gm_addEquip(){
    let name = document.getElementById("gm_equipName").value;
    let status = document.getElementById("gm_equipStatus").value;

    gm_equipments.push({name, status});
    gm_renderEquip();
}

function gm_changeStatus(i){
    gm_equipments[i].status =
        gm_equipments[i].status === "Working" ? "Repair" : "Working";
    gm_renderEquip();
}

function gm_renderEquip(){
    let html = "";
    gm_equipments.forEach((e,i)=>{
        html += `
        <tr>
        <td>${e.name}</td>
        <td>${e.status}</td>
        <td><button onclick="gm_changeStatus(${i})">Change</button></td>
        </tr>`;
    });
    document.getElementById("gm_equipList").innerHTML = html;
}

/* -------- MEMBERS -------- */
let gm_members = [];

function gm_addMember(){
    let name = document.getElementById("gm_memberName").value;
    let start = document.getElementById("gm_startDate").value;
    let days = document.getElementById("gm_days").value;

    gm_members.push({name, start, days});
    gm_renderMember();
}

function gm_renderMember(){
    let today = new Date();
    let html = "";

    gm_members.forEach(m=>{
        let start = new Date(m.start);
        let diff = Math.floor((today - start)/(1000*60*60*24));
        let left = m.days - diff;

        let status = left > 0 ? "Active" : "Expired";
        let className = left > 0 ? "gm_active" : "gm_expired";

        html += `
        <tr>
        <td>${m.name}</td>
        <td>${left > 0 ? left : 0}</td>
        <td class="${className}">${status}</td>
        </tr>`;
    });

    document.getElementById("gm_memberList").innerHTML = html;
}

/* -------- TRAINERS -------- */
let gm_trainers = [];

function gm_addTrainer(){
    let name = document.getElementById("gm_trainerName").value;
    let hours = document.getElementById("gm_hours").value;
    let payment = document.getElementById("gm_payment").value;

    gm_trainers.push({name, hours, payment});
    gm_renderTrainer();
}

function gm_renderTrainer(){
    let html = "";
    gm_trainers.forEach(t=>{
        html += `
        <tr>
        <td>${t.name}</td>
        <td>${t.hours}</td>
        <td>${t.payment}</td>
        </tr>`;
    });

    document.getElementById("gm_trainerList").innerHTML = html;
}

/* -------- ATTENDANCE -------- */

let ga_data = JSON.parse(localStorage.getItem("ga_gymData")) || [];

function ga_saveData(){
    let time = document.getElementById("ga_time").value;
    let calories = document.getElementById("ga_calories").value;
    let attendance = document.getElementById("ga_attendance").value;

    let today = new Date().toLocaleDateString();

    let entry = {
        date: today,
        time: Number(time),
        calories: Number(calories),
        attendance: attendance
    };

    ga_data.push(entry);
    if(ga_data.length > 7) ga_data.shift();

    localStorage.setItem("ga_gymData", JSON.stringify(ga_data));

    ga_updateUI();
}

function ga_updateUI(){
    if(ga_data.length === 0) return;

    let last = ga_data[ga_data.length - 1];

    document.getElementById("ga_todayTime").innerText = last.time + " min";
    document.getElementById("ga_todayCalories").innerText = last.calories + " cal";
    document.getElementById("ga_todayStatus").innerText = last.attendance;

    /* -------- HISTORY -------- */
    let historyHTML = "";
    ga_data.forEach(d=>{
        historyHTML += `
        <div class="history-item">
            <span>${d.date}</span>
            <span>${d.time}m</span>
            <span>${d.calories}c</span>
            <span>${d.attendance}</span>
        </div>`;
    });
    document.getElementById("ga_historyList").innerHTML = historyHTML;

    /* -------- CHART -------- */
    let labels = ga_data.map(d=>d.date);
    let caloriesData = ga_data.map(d=>d.calories);

    if(window.ga_chartInstance) window.ga_chartInstance.destroy();

    const ctx = document.getElementById("ga_chart").getContext("2d");

    // 🔥 Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "#0bcbd9");
    gradient.addColorStop(1, "#1e2a2f");

    window.ga_chartInstance = new Chart(ctx,{
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Calories Burned",
                data: caloriesData,
                backgroundColor: gradient,
                borderColor: "#ffffff",
                borderWidth: 2,
                borderRadius: 6
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: "white"
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: "white" },
                    grid: { color: "rgba(255,255,255,0.1)" }
                },
                y: {
                    ticks: { color: "white" },
                    grid: { color: "rgba(255,255,255,0.1)" }
                }
            }
        }
    });
}

ga_updateUI();