const DATA_SRC: string = "https://jsonplaceholder.typicode.com/posts/";

document.addEventListener("DOMContentLoaded", function () {
    getData(DATA_SRC)
        .then(data => {
            const modifiedData = updateObjectInArray<dataJson>(data, "userId", 2);
            buildList(modifiedData);
        })

        .catch(() => alert("Sorry, something went wrong!"));
});

async function getData(DATA_SRC: string): Promise<Array<dataJson>>{
    let response = await fetch(DATA_SRC);
    let data = await response.json();
    return data;
}

function buildList(data: Array<dataJson>) {
    const listElement = document.getElementById("list")!;
    data.map((item : dataJson) => {
        let cardElement = document.createElement("div");
        cardElement.classList.add("item");
        listElement.appendChild(cardElement)

        let nameElement = document.createElement("div");
        nameElement.innerHTML = item.title;
        nameElement.classList.add("itemTitle");
        cardElement.appendChild(nameElement)

        let itemDescription = document.createElement("div");
        itemDescription.innerHTML = item.body;
        itemDescription.classList.add("itemDescription");
        cardElement.appendChild(itemDescription);

        let userId = document.createElement("div");
        userId.innerHTML = `userId: ${item.userId}`;
        cardElement.appendChild(userId);
    })
}

interface dataJson {
    id: number;
    title: string;
    body: string;
    userId: number
}

function updateObjectInArray<T>(array: T[], key: string, newKeyValue: number): T[] {
    let newArr: T[] = [];
    array.map((item: any) => {
        let newItem = {...item};
        newItem[key] = newKeyValue;
        newArr.push(newItem)
    })
    return newArr;
}

