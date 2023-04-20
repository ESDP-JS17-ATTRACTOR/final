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
    I.wait(2);
});

When('I click {string} button', (buttonName: string) => {
    I.click(locate('button').withText(buttonName));
    I.wait(2);
});
When('I enter form fields:', (tableData: TableData) => {
    tableData.rows.forEach(row => {
        const [fieldName, fieldValue] = row.cells;
        I.fillField(fieldName.value, fieldValue.value);
    });
    I.wait(2);
});

When('I click {string} button', (buttonName: string) => {
    I.click(locate('button').withText(buttonName));
    I.wait(2);
});

Then('I should see {string} in App Tool Bar', () => {
    I.see("HELLO, TEST FIRST NAME");
});

When('I enter form fields:', (tableData: TableData) => {
    tableData.rows.forEach(row => {
        const [fieldName, fieldValue] = row.cells;
        I.fillField(fieldName.value, fieldValue.value);
    });
    I.wait(2);
});

When('I click button with className {string}', (buttonClass: string) => {
    I.click(locate('button').withAttr({class: buttonClass}));
    I.wait(2);
});

Then('I should see {string} in App Tool Bar', () => {
    I.see("HELLO, TEST FIRST NAME");
});

Then('I click {string} button in App Tool Bar', (buttonText: string) => {
    I.click(locate('button').withText(buttonText));
});

Then('I click {string} menu item', (menuItemText) => {
    I.click(locate('li').withText(menuItemText));
});

Then('I see in App Tool Bar {string} button', (buttonText: string) => {
    I.see(buttonText);
});

When('I select option {string}', (optionValue: string) => {
    I.selectOption('#languageSwitcher', optionValue);
    I.wait(1);
});

Then('I see the main headline {string}', (headlineText: string) => {
    I.see(headlineText);
    I.wait(1);
});
