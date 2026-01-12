# Google Form Setup Instructions for MomEase Waitlist

This guide will help you connect the MomEase waitlist form to a Google Form that sends responses to `info@momeaseinnovation.com`.

## Step 1: Create a Google Form

1. Go to [Google Forms](https://forms.google.com)
2. Sign in with the Gmail account: **info@momeaseinnovation.com**
3. Click the **"+ Blank"** button to create a new form
4. Name your form: **"MomEase Waitlist"**

## Step 2: Add Form Fields

Add the following fields to your Google Form in this exact order:

### Field 1: Name
- **Type:** Short answer
- **Question:** Full Name
- **Required:** Yes

### Field 2: Email
- **Type:** Short answer
- **Question:** Email Address
- **Required:** Yes
- **Validation:** Enable "Response validation" → "Text" → "Email"

### Field 3: Phone
- **Type:** Short answer
- **Question:** Phone Number
- **Required:** Yes

## Step 3: Get Form Entry IDs

To find the entry IDs for each field:

1. Click the **"Send"** button in the top right
2. Click the **link icon** (<>)
3. Copy the link and paste it into a new browser tab
4. Right-click on the page and select **"View Page Source"** (or press Ctrl+U / Cmd+Option+U)
5. Search for **"entry."** in the source code
6. You'll find lines like:
   ```html
   <input name="entry.123456789" type="text">
   <input name="entry.987654321" type="email">
   <input name="entry.456789123" type="tel">
   ```
7. Note down these entry IDs:
   - Name field entry ID: `entry.XXXXXXXXX`
   - Email field entry ID: `entry.YYYYYYYYY`
   - Phone field entry ID: `entry.ZZZZZZZZZ`

## Step 4: Get Form ID

1. In the Google Form, look at the URL in your browser
2. The URL will look like: `https://docs.google.com/forms/d/YOUR_FORM_ID_HERE/edit`
3. Copy the **YOUR_FORM_ID_HERE** part (it's a long string of characters)

## Step 5: Update index.html

Open `index.html` and find line 492. Update the following:

### Replace the form action URL:
**Find:**
```html
<form id="waitlist-form" action="https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse" method="POST" target="hidden_iframe" class="space-y-6">
```

**Replace with:**
```html
<form id="waitlist-form" action="https://docs.google.com/forms/d/e/YOUR_ACTUAL_FORM_ID/formResponse" method="POST" target="hidden_iframe" class="space-y-6">
```

### Update the entry IDs:

**Line 496 - Name field:**
```html
<input type="text" id="name" name="entry.YOUR_NAME_ENTRY_ID" required
```

**Line 504 - Email field:**
```html
<input type="email" id="email" name="entry.YOUR_EMAIL_ENTRY_ID" required
```

**Line 512 - Phone field:**
```html
<input type="tel" id="phone" name="entry.YOUR_PHONE_ENTRY_ID" required
```

## Step 6: Configure Form Responses

1. In Google Forms, click the **"Responses"** tab
2. Click the three dots menu (⋮) in the top right
3. Select **"Select response destination"**
4. Choose **"Create a new spreadsheet"** or select an existing one
5. Name it: **"MomEase Waitlist Responses"**

## Step 7: Set Up Email Notifications (Optional)

To receive email notifications for each submission:

1. In the Google Sheets spreadsheet (where responses are stored)
2. Click **"Extensions"** → **"Apps Script"**
3. Delete any existing code and paste:

```javascript
function onFormSubmit(e) {
  var sheet = e.source.getActiveSheet();
  var row = e.range.getRow();

  var timestamp = sheet.getRange(row, 1).getValue();
  var name = sheet.getRange(row, 2).getValue();
  var email = sheet.getRange(row, 3).getValue();
  var phone = sheet.getRange(row, 4).getValue();

  var subject = "New MomEase Waitlist Signup: " + name;
  var body = "New waitlist signup received!\n\n" +
             "Name: " + name + "\n" +
             "Email: " + email + "\n" +
             "Phone: " + phone + "\n" +
             "Timestamp: " + timestamp;

  MailApp.sendEmail("info@momeaseinnovation.com", subject, body);
}
```

4. Click **"Save"** (disk icon)
5. Click **"Triggers"** (clock icon) in the left sidebar
6. Click **"+ Add Trigger"**
7. Set:
   - Choose which function to run: **onFormSubmit**
   - Choose which deployment should run: **Head**
   - Select event source: **From spreadsheet**
   - Select event type: **On form submit**
8. Click **"Save"**
9. Grant permissions when prompted

## Step 8: Test the Form

1. Go to your website and fill out the waitlist form
2. Submit the form
3. Check:
   - The success message appears on the website
   - A response appears in your Google Sheets
   - You receive an email notification (if you set up Step 7)

## Example Complete Setup

Here's what your form tag should look like after setup (with example values):

```html
<form id="waitlist-form" action="https://docs.google.com/forms/d/e/1FAIpQLSdABCDEFGHIJKLMNOPQRSTUVWXYZ123456789/formResponse" method="POST" target="hidden_iframe" class="space-y-6">
    <div>
        <label for="name" class="block text-gray-700 font-semibold mb-2">Full Name *</label>
        <input type="text" id="name" name="entry.123456789" required
               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
               placeholder="Enter your full name">
    </div>

    <div>
        <label for="email" class="block text-gray-700 font-semibold mb-2">Email Address *</label>
        <input type="email" id="email" name="entry.987654321" required
               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
               placeholder="your.email@example.com">
    </div>

    <div>
        <label for="phone" class="block text-gray-700 font-semibold mb-2">Phone Number *</label>
        <input type="tel" id="phone" name="entry.456789123" required
               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
               placeholder="+1 (555) 000-0000">
    </div>
</form>
```

## Troubleshooting

### Form doesn't submit or redirects to Google Forms
- Make sure you included `target="hidden_iframe"` in the form tag
- Make sure the hidden iframe exists in the HTML
- Check that the form action URL ends with `/formResponse` not `/viewform`

### Responses not appearing in Google Sheets
- Verify the form is linked to a spreadsheet (Responses tab → three dots → "Select response destination")
- Check that the entry IDs exactly match those in your Google Form

### Success message not showing
- The JavaScript code should hide the form and show the success message after 500ms
- Check the browser console for any JavaScript errors

## Contact Information

All form responses will be sent to and managed by:
- **Email:** info@momeaseinnovation.com
- **Phone:** 8882283654

These contact details are also displayed in the website footer.
