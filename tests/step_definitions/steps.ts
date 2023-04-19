const {I} = inject();

interface TableDataCell {
    value: string;
}

interface TableDataRow {
    cells: TableDataCell[];
}

interface TableData {
    rows: TableDataRow[];
}

Given('I am on the main page', () => {
    I.amOnPage('/');
    I.wait(5);
});

When('I click {string} button', (buttonName: string) => {
    I.click(locate('button').withText(buttonName));
    I.wait(5);
});
When('I enter form fields:', (tableData: TableData) => {
    tableData.rows.forEach(row => {
        const [fieldName, fieldValue] = row.cells;
        I.fillField(fieldName.value, fieldValue.value);
    });
    I.wait(5);
});

When('I click {string} button', (buttonName: string) => {
    I.click(locate('button').withText(buttonName));
    I.wait(5);
});

Then('I should see {string} in App Tool Bar', () => {
    I.see("HELLO, TEST FIRST NAME");
});

Given('I am on the main page', () => {
    I.amOnPage('/');
    I.wait(4);
});

When('I click {string} button', (buttonName: string) => {
    I.click(locate('button').withText(buttonName));
    I.wait(4);
});
When('I enter form fields:', (tableData: TableData) => {
    tableData.rows.forEach(row => {
        const [fieldName, fieldValue] = row.cells;
        I.fillField(fieldName.value, fieldValue.value);
    });
    I.wait(4);
});

When('I click button with className {string}', (buttonClass: string) => {
    I.click(locate('button').withAttr({class: buttonClass}));
    I.wait(5);
});

Then('I should see {string} in App Tool Bar', () => {
    I.see("HELLO, TEST FIRST NAME");
});