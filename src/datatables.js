const seed = require("./seed");

const query = {};

//if the field is empty return empty string
const isEmpty = (field) => {
    return field ? field : "";
}

//with DT but without DT fields
/*
const dataArray = (dataObject) => {
    let arr = [];
    for (let i = 0; i < dataObject.length; i++) {
        const obj = dataObject[i];
        arr.push({
            "Name": obj.Name,
            "Description": isEmpty(obj.Description),
            "Sales": isEmpty(obj.Sales),
            "Stock": isEmpty(obj.Stock),
            "Category": isEmpty(obj.Category),
            "Tag": isEmpty(obj.Tag),
            "Check": isEmpty(obj.Check),
            "ImageP": isEmpty(obj.ImageP),
            "Thumb": isEmpty(obj.Thumb),
            "Date": isEmpty(obj.Date)
        });
    }
    return arr;
}*/

const dataArray = (dataObject) => {
    let arr = [];
    for (let i = 0; i < dataObject.length; i++) {
        const obj = dataObject[i];
        arr.push([
            obj.Name,
            isEmpty(obj.Description),
            isEmpty(obj.Sales),
            isEmpty(obj.Stock),
            isEmpty(obj.Category),
            isEmpty(obj.Tag),
            isEmpty(obj.Check),
            isEmpty(obj.ImageP),
            isEmpty(obj.Thumb),
            isEmpty(obj.Date)
        ]);
    }
    return arr;
}


const dataStartFilter = (data, startIndex) => {
    let size = data.length;
    if (startIndex >= size) return [];
    else return data.slice(startIndex);
};

const dataLengthFilter = (data, length) => {
    let size = data.length;
    if (length === -1 || length > size) return data;
    else return data.slice(0, length);
};

const output = (params) => {
    const draw = params.draw;
    const startIndex = params.startIndex;
    const length = params.length;

    return seed.findBread(query).then(dbData => {
        //let data = dataArray(dbData.slice(0, 1));
        let data = dataStartFilter(dbData, startIndex);
        data = dataLengthFilter(data, length)
        data = dataArray(data);
        let results = {
            draw,
            //Total records, before filtering
            recordsTotal: dbData.length,
            //not just the number of records being returned for this page of data
            recordsFiltered: data.length,
            //data: [...dbData, { "addition": "added" }]
            data
        };
        return results;
    });
}

exports.output = output;