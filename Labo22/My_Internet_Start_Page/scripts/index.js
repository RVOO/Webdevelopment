let global = {
    history: [],
    commands: ['/g', '/y', '/t', '/i', '/w', '/r', '/tw'],
    titles: ["Google", "Youtube", "Twitter", "Instagram", "Wikipedia", "Reddit", "Twitch"],
    sites: ["https://www.google.com/search?q=",
        "https://www.youtube.com/results?search_query=",
        "https://twitter.com/hashtag/",
        "https://www.instagram.com/explore/tags/",
        "https://en.wikipedia.org/wiki/",
        "https://www.reddit.com/search/?q=",
        "https://www.twitch.tv/search?term="]
}

const setup = () => {
    let localHistory = JSON.parse(localStorage.getItem('history'));
    if(localHistory !== null) {
        restoreHistory(localHistory);
    }
    const goBtn = document.querySelector('#Go');
    goBtn.addEventListener('click', getLink);

    const list = document.querySelector('#list');
    list.addEventListener('click', getList);
}

const restoreHistory = (localHistory) => {
    for(let i = 0; i < localHistory.length; i++) {
        let object = JSON.parse(localHistory[i]);
        saveInHistory(object.title, object.text, object.url);
    }
}

const getList = (event) =>{
    const listDiv = document.getElementById('listDiv');
    for(let i = 0; i < global.commands.length; i++){
        let par = document.createElement('p');
        par.textContent = global.commands[i] + " -> " + global.titles[i];
        listDiv.appendChild(par);
    }
    event.currentTarget.removeEventListener('click', getList);
    event.currentTarget.addEventListener('click', getRidOfList);
    listDiv.classList.toggle('hidden');
}
const getRidOfList = (event) =>{
    const listDiv = document.getElementById('listDiv');
    listDiv.classList.toggle('hidden');
    listDiv.innerHTML = "";
    event.currentTarget.removeEventListener('click', getRidOfList);
    event.currentTarget.addEventListener('click', getList);
}

const getLink = () =>{
    const input = document.querySelector('#search');
    const string = input.value.trim();
    let command;
    let search;
    if(string.startsWith('/')){
         command = string.substring(0, string.indexOf(' '));
         search = string.substring(string.indexOf(' '));
    }else{
        window.alert("Invalid command")
        return false;
    }
    let index = findCommand(command);
    if(index === -1){
        window.alert("Unknown command prefix");
        return false;
    }else{
        let siteUrl = global.sites[index];
        let title = global.titles[index];
        let url = saveInHistory(title, search, siteUrl);
        input.value = "";
        window.open(url);
        localStorage.setItem('history', JSON.stringify(global.history));
    }
}

const findCommand = (command) =>{
    for(let i = 0; i<global.commands.length; i++){
        if(global.commands[i] === command){
            return i;
        }
    }
    return -1;
}

const saveInHistory = (title, search, siteUrl) => {
    let url = replaceAll(search, ' ', '+')
    let object = {
        title: `${title}`,
        text: `${search}`,
        url: `${siteUrl}${url}`,
    };
    global.history.push(JSON.stringify(object));
    objectToHistoryCard(object, search);
    return object.url;
}

const replaceAll = (string, searchValue, replacement) =>{
    for(let i = 0; i < string.length; i++){
        if(string[i] === searchValue){
            string[i] = replacement;
        }
    }
    return string;
}

const objectToHistoryCard = (object, search) =>{
    let card = document.createElement('div');
    card.classList.add(`${object.title}`);
    card.classList.add('card');
    let header = document.createElement('h3');
    header.innerText = `${object.title}`;
    let par = document.createElement('p');
    par.innerHTML = search;
    let link = document.createElement('button');
    link.innerText = `GO!`;
    link.value = object.url;
    link.addEventListener('click', function(){window.open(object.url);});

    card.appendChild(header);
    card.appendChild(par);
    card.appendChild(link);
    let div = document.createElement('div');
    div.classList.add('col-4');
    div.appendChild(card);
    let insertField = document.querySelector('#Cards');
    insertField.insertBefore(div, insertField.firstChild);
}
window.addEventListener("load", setup);