# Site scanning snapshot experiment

Testing how Git versions large datasets most efficiently. 

Specifically, it's a "fork" of https://github.com/GSA/site-scanning-snapshots, but instead of storing the data as CSVs by SLD and XLSXs, it's stored as a single (formatted) JSON file per domain. 

In theory, this should be more efficient to version, as Git only needs to store diffs of individual fields, rather than entire rows or entire binary files. I also am testing if individual files are more efficient than one large JSON file. Does anyone actually know how Git Works?

Data remains [under the original CC0 license](https://github.com/GSA/site-scanning-snapshots/blob/main/LICENSE). Code licensed under ISC.