# 📧 Email Setup Guide for Contact Form

## 🚀 **Option 1: Formspree (Recommended - Free)**

### Step 1: Create Formspree Account
1. Go to [Formspree.io](https://formspree.io)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Create a New Form
1. Click "New Form" in your dashboard
2. Give it a name like "Eri's Japanese Tutoring Contact Form"
3. Copy the form endpoint (looks like: `https://formspree.io/f/xaybzwkd`)

### Step 3: Update the Website
1. Go to your GitHub repository: https://github.com/erinakafutami/erisensei.github.io
2. Click on `index.html`
3. Click the pencil icon to edit
4. Find this line: `<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`
5. Replace `YOUR_FORM_ID` with your actual form ID (e.g., `xaybzwkd`)
6. Click "Commit changes"

### Step 4: Test the Form
1. Go to your website: https://erisensei.github.io
2. Fill out the contact form
3. Submit it
4. Check your email for the notification

## 📱 **Option 2: EmailJS (Alternative - Free)**

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://emailjs.com)
2. Sign up for a free account
3. Verify your email

### Step 2: Set Up Email Service
1. Go to "Email Services" tab
2. Click "Add New Service"
3. Choose "Gmail" or "Outlook"
4. Connect your email account (sorasora.brown@gmail.com)

### Step 3: Create Email Template
1. Go to "Email Templates" tab
2. Click "Create New Template"
3. Use this template:

**Subject:** New Student Inquiry from Website
**Content:**
```
Name: {{name}}
Email: {{email}}
Level: {{level}}
Message: {{message}}
```

### Step 4: Get Template ID
1. Copy the Template ID
2. Update the JavaScript in your website

## 🔧 **Option 3: Google Forms (Simple)**

### Step 1: Create Google Form
1. Go to [forms.google.com](https://forms.google.com)
2. Create a new form
3. Add questions for: Name, Email, Level, Message
4. Click "Send" and copy the form URL

### Step 2: Replace Contact Form
1. Replace the entire contact form section with:
```html
<iframe src="YOUR_GOOGLE_FORM_URL/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
```

## 📊 **Option 4: Netlify Forms (If you move to Netlify)**

### Step 1: Deploy to Netlify
1. Go to [Netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Deploy the site

### Step 2: Forms Work Automatically
- Netlify automatically detects forms
- You'll get email notifications
- No additional setup needed

## 🎯 **Recommended Setup for Eri:**

I recommend **Formspree** because:
- ✅ **Free** for up to 50 submissions per month
- ✅ **Easy setup** - just copy and paste
- ✅ **Email notifications** to sorasora.brown@gmail.com
- ✅ **Spam protection** included
- ✅ **Mobile app** for notifications

## 📋 **What Eri Will Receive:**

When someone submits the form, Eri will get an email like this:

```
From: noreply@formspree.io
Subject: New submission from Eri's Japanese Tutoring Contact Form

Name: John Smith
Email: john@example.com
Level: Beginner
Message: Hi Eri! I'm interested in learning Japanese for my upcoming trip to Japan. I'm a complete beginner and would love to start with basic conversation skills.
```

## 🔔 **Additional Features:**

### **Formspree Dashboard:**
- View all submissions online
- Export data to CSV
- Set up webhooks
- Customize email templates

### **Mobile Notifications:**
- Download Formspree app
- Get instant notifications
- Reply directly from phone

## 🚨 **Important Notes:**

1. **Free Plan Limits:**
   - Formspree: 50 submissions/month
   - EmailJS: 200 emails/month
   - Google Forms: Unlimited

2. **Spam Protection:**
   - Formspree includes built-in spam filtering
   - You can whitelist/blacklist domains

3. **Backup Plan:**
   - Keep the Preply profile as backup contact method
   - Add WhatsApp or other messaging options

## 🎉 **After Setup:**

Once configured, Eri will:
- ✅ Receive email notifications for all form submissions
- ✅ Be able to reply directly to students
- ✅ Have a professional contact system
- ✅ Build her independent student base

**The contact form will be fully functional and Eri will never miss a potential student inquiry!** 📧✨ 