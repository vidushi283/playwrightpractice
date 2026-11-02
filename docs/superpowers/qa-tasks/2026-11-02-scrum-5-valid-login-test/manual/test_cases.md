# Test Cases for SCRUM-5 - Valid login test

**Total**: 8 (P1=3, P2=3, P3=2) | **Type**: 8 Manual (UI), 0 API
**Site under test**: https://practicetestautomation.com/practice-test-login/

**Test data** (from the ticket):
- `<valid_username>` = `student`
- `<valid_password>` = `Password123`
- `<invalid_username>` = `STUDENT` (case variant) or `<space>student<space>` (padded)
- `<invalid_password>` = any value other than `<valid_password>`, e.g. `WrongPassword1`

---

## P1 - Critical Path

### SCRUM-5_TC_001 [P1] - User logs in with valid credentials
**Covers AC**: AC1 - Only valid login should be allowed
**Type**: Manual
**Preconditions**: Browser is open; user is logged out

**Steps**:
1. Navigate to https://practicetestautomation.com/practice-test-login/
2. Enter username: `<valid_username>`
3. Enter password: `<valid_password>`
4. Click the "Submit" button

**Expected Result**: Login is accepted and the user leaves the login page for the logged-in confirmation page.

**Notes**: Entry point for TC_002 and TC_003; they can be verified in the same run.

### SCRUM-5_TC_002 [P1] - Logged-in page shows "Logged In Successfully"
**Covers AC**: AC2a - After login the user sees "Logged In Successfully"
**Type**: Manual
**Preconditions**: Browser is open; user is logged out

**Steps**:
1. Navigate to https://practicetestautomation.com/practice-test-login/
2. Enter username: `<valid_username>`
3. Enter password: `<valid_password>`
4. Click the "Submit" button
5. Read the page heading

**Expected Result**: The text "Logged In Successfully" is displayed.

**Notes**: Match the text exactly, including capitalisation.

### SCRUM-5_TC_003 [P1] - Logged-in page shows congratulations message and Log out button
**Covers AC**: AC2b, AC2c - After login the user sees the congratulations message and a Log out button
**Type**: Manual
**Preconditions**: Browser is open; user is logged out

**Steps**:
1. Navigate to https://practicetestautomation.com/practice-test-login/
2. Enter username: `<valid_username>`
3. Enter password: `<valid_password>`
4. Click the "Submit" button
5. Read the message in the page body
6. Look for the Log out button

**Expected Result**: The message "Congratulations student. You successfully logged in!" is displayed, and a "Log out" button is visible.

**Notes**: The message includes the username `student`; match the text exactly.

---

## P2 - Edge Cases

### SCRUM-5_TC_004 [P2] - User logs in by pressing Enter instead of clicking Submit
**Covers AC**: AC1, AC2 - Valid login is allowed and the confirmation page is shown
**Type**: Manual
**Preconditions**: Browser is open; user is logged out

**Steps**:
1. Navigate to https://practicetestautomation.com/practice-test-login/
2. Enter username: `<valid_username>`
3. Enter password: `<valid_password>`
4. With the cursor in the password field, press the Enter key

**Expected Result**: Login succeeds as in TC_001, and the page shows "Logged In Successfully", the congratulations message and a Log out button.

**Notes**: If Enter does not submit the form, record it as a defect against AC1.

### SCRUM-5_TC_005 [P2] - Username with different letter casing is rejected
**Covers AC**: AC1 - Only valid login should be allowed
**Type**: Manual
**Preconditions**: Browser is open; user is logged out

**Steps**:
1. Navigate to https://practicetestautomation.com/practice-test-login/
2. Enter username: `<invalid_username>` (`STUDENT`)
3. Enter password: `<valid_password>`
4. Click the "Submit" button

**Expected Result**: Login is not allowed; the user remains on the login page and does not see "Logged In Successfully".

**Notes**: The ticket does not state whether usernames are case-sensitive. If the site accepts it, raise it with the ticket owner and do not log it as a defect until confirmed.

### SCRUM-5_TC_006 [P2] - Username padded with whitespace is rejected
**Covers AC**: AC1 - Only valid login should be allowed
**Type**: Manual
**Preconditions**: Browser is open; user is logged out

**Steps**:
1. Navigate to https://practicetestautomation.com/practice-test-login/
2. Enter username: ` student ` (one leading and one trailing space)
3. Enter password: `<valid_password>`
4. Click the "Submit" button

**Expected Result**: Login is not allowed; the user remains on the login page and does not see "Logged In Successfully".

**Notes**: The ticket does not state whether input is trimmed. If the site accepts it, raise it with the ticket owner and do not log it as a defect until confirmed.

---

## P3 - Negative Scenarios

### SCRUM-5_TC_007 [P3] - Valid username with wrong password is rejected
**Covers AC**: AC1 - Only valid login should be allowed
**Type**: Manual
**Preconditions**: Browser is open; user is logged out

**Steps**:
1. Navigate to https://practicetestautomation.com/practice-test-login/
2. Enter username: `<valid_username>`
3. Enter password: `<invalid_password>`
4. Click the "Submit" button

**Expected Result**: Login is not allowed; the user remains on the login page and does not see "Logged In Successfully".

**Notes**: The ticket does not specify error text, so assert only that login is blocked. Note any error message shown.

### SCRUM-5_TC_008 [P3] - Submitting empty credentials is rejected
**Covers AC**: AC1 - Only valid login should be allowed
**Type**: Manual
**Preconditions**: Browser is open; user is logged out

**Steps**:
1. Navigate to https://practicetestautomation.com/practice-test-login/
2. Leave the username field empty
3. Leave the password field empty
4. Click the "Submit" button

**Expected Result**: Login is not allowed; the user remains on the login page and does not see "Logged In Successfully".

**Notes**: The ticket does not specify error text, so assert only that login is blocked. Note any error message shown.
