import { Table } from "https://cdn.jsdelivr.net/npm/apache-arrow@12/Arrow.es2015.min.js";

export function createArrowTable(data) {
    return Table.from(data);
}
