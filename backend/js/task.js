
/**
 * Task 1
 */
function leafFiles(files) {
    const parentIds = files.map(file => file.parent).filter(id => id !== -1);
    return files.filter(file => !parentIds.includes(file.id)).map(file => file.name);
}
/**
 * Task 1
 */
function kLargestCategories(files, k) {
    const categoryCounts = {};
    files.forEach(file => {
        file.categories.forEach(category => {
            if (categoryCounts[category]) {
                categoryCounts[category]++;
            } else {
                categoryCounts[category] = 1;
            }
        });
    });
    return Object.entries(categoryCounts)
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, k)
        .map(entry => entry[0]);
}

/**
 * Task 1
 */
function largestFileSize(files) {
    const parentIdToFile = files.reduce((acc, file) => {
        (acc[file.parent] = acc[file.parent] || []).push(file);
        return acc;
    }, {});

    return files.filter(file => file.parent === -1).reduce((max, file) => {
        const totalSize = calculateTotalSize(file.id, files, parentIdToFile);
        return Math.max(max, totalSize);
    }, 0);
}

// helper function which recursively finds total size 
function calculateTotalSize(fileId, files, parentIdToFile) {
    const children = parentIdToFile[fileId] || [];
    const fileSize = files.find(file => file.id === fileId)?.size || 0;
    return fileSize + children.reduce((acc, child) => acc + calculateTotalSize(child.id, files, parentIdToFile), 0);
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

const testFiles = [
    { id: 1, name: "Document.txt", categories: ["Documents"], parent: 3, size: 1024 },
    { id: 2, name: "Image.jpg", categories: ["Media", "Photos"], parent: 34, size: 2048 },
    { id: 3, name: "Folder", categories: ["Folder"], parent: -1, size: 0 },
    { id: 5, name: "Spreadsheet.xlsx", categories: ["Documents", "Excel"], parent: 3, size: 4096 },
    { id: 8, name: "Backup.zip", categories: ["Backup"], parent: 233, size: 8192 },
    { id: 13, name: "Presentation.pptx", categories: ["Documents", "Presentation"], parent: 3, size: 3072 },
    { id: 21, name: "Video.mp4", categories: ["Media", "Videos"], parent: 34, size: 6144 },
    { id: 34, name: "Folder2", categories: ["Folder"], parent: 3, size: 0 },
    { id: 55, name: "Code.py", categories: ["Programming"], parent: -1, size: 1536 },
    { id: 89, name: "Audio.mp3", categories: ["Media", "Audio"], parent: 34, size: 2560 },
    { id: 144, name: "Spreadsheet2.xlsx", categories: ["Documents", "Excel"], parent: 3, size: 2048 },
    { id: 233, name: "Folder3", categories: ["Folder"], parent: -1, size: 4096 },
];

console.assert(arraysEqual(
    leafFiles(testFiles).sort((a, b) => a.localeCompare(b)),
    [
        "Audio.mp3",
        "Backup.zip",
        "Code.py",
        "Document.txt",
        "Image.jpg",
        "Presentation.pptx",
        "Spreadsheet.xlsx",
        "Spreadsheet2.xlsx",
        "Video.mp4"
    ]
));

console.assert(arraysEqual(
    kLargestCategories(testFiles, 3),
    ["Documents", "Folder", "Media"]
));

console.assert(largestFileSize(testFiles) == 20992)