const seed = require("./seed");

const query = {};

const dataArray = (dataObject) => {
    let arr = [];
    for (let i = 0; i < dataObject.length; i++) {
        const obj = dataObject[i];
        //HANDLE EMPTY FIELD CASES
        arr.push([
            obj.name,
            obj.stock,
            obj.sales,
            obj.category,
            obj.tag,
            obj.img,
            obj.thumb
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