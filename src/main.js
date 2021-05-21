import "bootstrap/dist/css/bootstrap.min.css";

import "@/assets/css/main.css";

const MAX_ROWS = 10000;
const ROWS_OFFSET = 2;
const ROWS_PER_FRAME = 100;

const EMOJIS = [
    "🙃", "😉", "😅", "🤣", "🥺", "😌", "😭", "🤔", "🎁", "🚀", "✨", "👌", "😍", "😕", "🥰", "👋", "🐇",
    "🐰", "🎩", "💡", "🎉", "🎊", "💊", "💉", "😇", "😊", "🐘", "📞", "📲", "🥇", "🥈", "🥉", "🍕", "🪁",
    "😴", "📕", "👨‍💻", "🍺", "☕", "🗻", "😒", "😂", "📷", "📖", "🏂", "🍻", "🎮", "🎤", "🎻", "🎸", "😔",
    "🤯", "💣", "🔝", "🥚", "😎", "🐟", "📝", "😛", "😏", "😢", "😥", "👏", "🤫", "🕺", "✋", "🤙", "🥳"
];
const WORDS = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "Pellentesque", "non",
    "risus", "aliquam", "eros", "ex", "lobortis", "ut", "mi", "eget", "consectetur", "sollicitudin", "nulla",
    "phasellus", "hendrerit", "convallis", "libero", "dignissim", "placerat", "enim", "porttitor", "eget", "nam",
    "eu", "rhoncus", "dolor", "quis", "maximus", "mauris", "in", "dignissim", "lacus", "facilisis", "risus", "mattis",
    "maximus", "aenean", "sed", "mi", "vel", "nisi", "commodo", "semper", "iaculis", "et", "elit", "aenean", "at",
    "condimentum", "eros", "et", "hendrerit", "dolor", "nullam", "bibendum", "turpis", "in", "quam", "commodo"
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
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}
function randomPhrase(list)
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

function* generateRows(rowsNumber)
{
    for (const index of range(rowsNumber))
    {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${randomElement(EMOJIS)}</td>
            <td class="number">#${index + 1}</td>
            <td>${capitalize(randomPhrase(WORDS))}.</td>
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
            <td>${capitalize(randomPhrase(WORDS))}.</td>
            <td>
                ${capitalize(randomPhrase(WORDS))} ${randomPhrase(WORDS)},
                ${randomPhrase(WORDS)} ${randomPhrase(WORDS)}.
            </td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td>${randomPhrase(EMOJIS)}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>
            <td class="number">${randomNumber()}</td>`;

        yield row;
    }
}

function* initialize()
{
    const progress = document.querySelector("#progress-bar");
    const content = document.querySelector("#app");
    const table = document.createElement("table");

    content.appendChild(table);
    table.innerHTML = `
    <thead>
        <tr>
            <th colspan="36">Dettaglio riga</th>
        </tr>
    </thead>
    <tbody></tbody>`;

    const tableBody = table.tBodies[0];
    const tableRows = [];

    let counter = 0;

    for (const row of generateRows(MAX_ROWS))
    {
        counter += 1;
        tableRows.push(row);

        if ((counter % ROWS_PER_FRAME) === 0)
        {
            progress.style.width = `${(counter * 100) / MAX_ROWS}%`;

            yield;
        }
    }

    const startSpacingRow = document.createElement("tr");
    const endSpacingRow = document.createElement("tr");

    startSpacingRow.innerHTML = `<td class="spacer" colspan="36"></td>`;
    endSpacingRow.innerHTML = `<td class="spacer" colspan="36"></td>`;

    const startSpacingCell = startSpacingRow.children[0];
    const endSpacingCell = endSpacingRow.children[0];

    tableBody.replaceChildren(startSpacingRow, endSpacingRow);

    let previousMinimum = null;
    let previousMaximum = null;

    function onScrollEvent()
    {
        const contentHeight = content.clientHeight;
        const contentRect = content.getBoundingClientRect();
        const tableRect = tableBody.getBoundingClientRect();
        const tableStart = (tableRect.top - contentRect.top);

        const tableHeight = (tableBody.scrollHeight > contentHeight) ? tableBody.scrollHeight : contentHeight;
        const showedRows = tableBody.children.length;

        let guessedRowHeight = 33;

        if (showedRows > 2)
        {
            guessedRowHeight = tableHeight / tableRows.length;
        }

        const visibleRows = contentHeight / guessedRowHeight;
        const rawLastVisibleRow = (contentHeight - tableStart) / guessedRowHeight;

        const lastVisibleRow = Math.min(Math.ceil(rawLastVisibleRow), tableRows.length);
        const firstVisibleRow = Math.max(Math.floor(rawLastVisibleRow - visibleRows), 0);

        const minimum = firstVisibleRow + ROWS_OFFSET;
        const maximum = lastVisibleRow - ROWS_OFFSET;

        if ((previousMinimum === null) || (previousMaximum === null) ||
            (minimum >= previousMaximum) || (maximum <= previousMinimum))
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

    const rowIndexInput = document.querySelector("#row-index");
    const submitButton = document.querySelector("#submit");

    content.addEventListener("resize", onScrollEvent, { passive: true });
    content.addEventListener("scroll", onScrollEvent, { passive: true });

    submitButton.addEventListener("click", () =>
    {
        const rowIndex = parseInt(rowIndexInput.value) - ROWS_OFFSET;
        const guessedRowHeight = tableBody.clientHeight / tableRows.length;

        content.scrollTop = guessedRowHeight * rowIndex;

    }, { passive: true });

    requestAnimationFrame(onScrollEvent);

    rowIndexInput.removeAttribute("disabled");
    submitButton.removeAttribute("disabled");
}

const initializer = initialize();

function main()
{
    initializer.next();

    requestAnimationFrame(main);
}

requestAnimationFrame(main);
