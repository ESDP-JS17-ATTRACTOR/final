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

Then('I click {string} button in App Tool Bar', (buttonText) => {
    I.click(locate('button').withText(buttonText));
});

Then('I click {string} menu item', (menuItemText) => {
    I.click(locate('li').withText(menuItemText));
});

Then('I see in App Tool Bar {string} button', (buttonText) => {
    I.see(buttonText);
});

Given('the user is on the landing page', () => {
  I.amOnPage('/');
  I.wait(1);
});

When('the user select option {string}', (optionValue) => {
    I.selectOption('#languageSwitcher', optionValue);
    I.wait(1);
});

Then('the user should see the main headline {string}', (headlineText) => {
    I.see(headlineText);
    I.wait(1);
});
