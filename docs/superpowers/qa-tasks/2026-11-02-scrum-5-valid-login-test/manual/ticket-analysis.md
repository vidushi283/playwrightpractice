# Ticket Analysis - SCRUM-5

**Title**: Valid login test
**Type / Status / Priority**: Story / To Do / Medium
**Project**: SCRUM "QATesting" (epampractice.atlassian.net)
**Comments / Subtasks / Links / Attachments**: 0 / 0 / 0 / 0

## Description (summary)

"As an SDET I want to be able to login to practicetestautomation.com/practice-test-login using the credentials student / Password123."

## Acceptance Criteria (from description, quality: clear)

1. Only valid login should be allowed.
2. After login the user should see:
   - a) "Logged In Successfully"
   - b) "Congratulations student. You successfully logged in!"
   - c) a Log out button

## Coverage Rationale

| Step | Value |
|---|---|
| AC count | 2 (base = 3 x 2 = 6) |
| Risk multiplier | x1.5 (keyword "password": high-risk) |
| Complexity multiplier | x1.0 (Medium priority, no comments or subtasks) |
| Simplicity reducer | x0.9 (zero comments) |
| Result | 6 x 1.5 x 1.0 x 0.9 = 8.1, rounded to 8 (within clamp 3-25) |
| Priority split | P1=3 (33%), P2=3 (42%), P3=2 (25%) |
| Type split | UI 100%, API 0% (no endpoints in the ticket) |

## Notes and Gaps

- The ticket targets practicetestautomation.com, while the automation repo (`playwrightpractice`) targets saucedemo.com. The cases follow the ticket.
- The ticket does not state error behaviour (message text, case-sensitivity, input trimming), so negative cases assert only that login is blocked. TC_005 and TC_006 flag the unspecified behaviour in their Notes.
- The ticket text has a typo ("follwoing"); it does not affect the criteria.
