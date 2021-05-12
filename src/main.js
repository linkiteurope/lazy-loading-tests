import "@/assets/css/main.css";

const EMOJIS = [
    "🙃", "😉", "😅", "🤣", "🥺", "😌", "😭", "🤔", "🎁", "🚀", "✨", "👌", "😍", "😕", "🥰", "👋", "🐇",
    "🐰", "🎩", "💡", "🎉", "🎊", "💊", "💉", "😇", "😊", "🐘", "📞", "📲", "🥇", "🥈", "🥉", "🍕", "🪁",
    "😴", "📕", "👨‍💻", "🍺", "☕", "🗻", "😒", "😂", "📷", "📖", "🏂", "🍻", "🎮", "🎤", "🎻", "🎸", "😔",
    "🤯", "💣", "🔝", "🥚", "😎", "🐟", "📝", "😛", "😏", "😢", "😥", "👏", "🤫", "🕺", "✋", "🤙"
];
const WORDS = [
    "Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "Pellentesque", "non",
    "risus", "Aliquam", "eros", "ex", "lobortis", "ut", "mi", "eget", "consectetur", "sollicitudin", "nulla",
    "Phasellus", "hendrerit", "convallis", "libero", "dignissim", "placerat", "enim", "porttitor", "eget", "Nam",
    "eu", "rhoncus", "dolor", "quis", "maximus", "mauris", "In", "dignissim", "lacus", "facilisis", "risus", "mattis",
    "maximus", "Aenean", "sed", "mi", "vel", "nisi", "commodo", "semper", "iaculis", "et", "elit", "Aenean", "at",
    "condimentum", "eros", "et", "hendrerit", "dolor", "Nullam", "bibendum", "turpis", "in", "quam", "commodo"
];

/**
 * Example table generation:
 */
function* range(value)
{
    for (let index = 0; index < value; index += 1)
    {
        yield index;
    }
}

function capitalize(value)
{
    return value.charAt(0).toUpperCase() + value.slice(1);
}
function generatePhrase(list)
{
    const words = Math.floor(Math.random() * 4) + 2;

    let phrase = [];
    for (let index = 0; index < words; index += 1)
    {
        phrase.push(randomElement(list));
    }

    return phrase.join(" ").toLowerCase();
}
function randomNumber()
{
    return Math.floor(Math.random() * 1000000);
}
function randomElement(list)
{
    return list[Math.floor(Math.random() * list.length)];
}

function* generateTable(value)
{
    for (const index of range(value))
    {
        yield `
            <td>${randomElement(EMOJIS)}</td>
            <td class="number">#${index + 1}</td>
            <td>${capitalize(generatePhrase(WORDS))}.</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td>${capitalize(generatePhrase(WORDS))}.</td>
            <td>
                ${capitalize(generatePhrase(WORDS))} ${generatePhrase(WORDS)},
                ${generatePhrase(WORDS)} ${generatePhrase(WORDS)}.
            </td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td>${generatePhrase(EMOJIS)}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>`;
    }
}

document.querySelector("#app").innerHTML = `<table class="lazy-loading">
<thead>
    <tr>
        <th colspan="36">Dettaglio riga</th>
    </tr>
</thead>
<tbody></tbody>
</table>`;

const table = document.querySelector(".lazy-loading");

const tableBody = table.tBodies[0];

for (const child of generateTable(1000))
{
    const row = document.createElement("tr");

    row.innerHTML = child;
    tableBody.append(row);
}

const tableRows = [...tableBody.rows];
const tableHeight = tableBody.scrollHeight;
const guessedRowHeight = tableHeight / tableRows.length;

const startSpacingRow = document.createElement("tr");
const endSpacingRow = document.createElement("tr");

startSpacingRow.innerHTML = `<td colspan="36" style="border: none;"></td>`;
endSpacingRow.innerHTML = `<td colspan="36" style="border: none;"></td>`;

const startSpacingCell = startSpacingRow.children[0];
const endSpacingCell = endSpacingRow.children[0];

tableBody.prepend(startSpacingRow);
tableBody.append(endSpacingRow);

let previousMinimum = tableRows.length;
let previousMaximum = 0;

function onScrollEvent()
{
    const windowHeight = window.innerHeight;
    const tableRect = tableBody.getBoundingClientRect();
    const tableStart = tableRect.top;

    const visibleRows = windowHeight / guessedRowHeight;
    const rawLastVisibleRow = (windowHeight - tableStart) / guessedRowHeight;

    const lastVisibleRow = Math.min(Math.ceil(rawLastVisibleRow), tableRows.length);
    const firstVisibleRow = Math.max(Math.ceil(rawLastVisibleRow - visibleRows), 1);

    const minimum = firstVisibleRow + 1;
    const maximum = lastVisibleRow - 3;

    if ((minimum >= previousMaximum) || (maximum <= previousMinimum))
    {
        const children = tableRows.slice(minimum, maximum);

        tableBody.replaceChildren(startSpacingRow, ...children, endSpacingRow);
    }
    else
    {
        tableBody.removeChild(startSpacingRow);
        tableBody.removeChild(endSpacingRow);

        if (minimum < previousMinimum)
        {
            const beforeChildren = tableRows.slice(minimum, previousMinimum);

            tableBody.prepend(...beforeChildren);
        }
        else if (minimum > previousMinimum)
        {
            const beforeChildren = tableRows.slice(previousMinimum, minimum);

            beforeChildren.forEach((child) => tableBody.removeChild(child));
        }

        if (maximum > previousMaximum)
        {
            const afterChildren = tableRows.slice(previousMaximum, maximum);

            tableBody.append(...afterChildren);
        }
        else if (maximum < previousMaximum)
        {
            const afterChildren = tableRows.slice(maximum, previousMaximum);

            afterChildren.forEach((child) => tableBody.removeChild(child));
        }

        tableBody.prepend(startSpacingRow);
        tableBody.append(endSpacingRow);
    }

    const childrenBeforeHeight = minimum * guessedRowHeight;
    const childrenAfterHeight = (tableRows.length - maximum) * guessedRowHeight;

    startSpacingCell.style.height = `${childrenBeforeHeight}px`;
    endSpacingCell.style.height = `${childrenAfterHeight}px`;

    previousMinimum = minimum;
    previousMaximum = maximum;
}

window.addEventListener("resize", onScrollEvent, { passive: true });
window.addEventListener("scroll", onScrollEvent, { passive: true });

onScrollEvent();
