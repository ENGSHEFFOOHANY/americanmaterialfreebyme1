# WhatsApp Group Subscription with Google Form Modal

This project creates a beautiful landing page for WhatsApp group subscriptions with an integrated Google Form modal.

## Features

- **WhatsApp Group Integration**: Direct link to join WhatsApp groups
- **Google Form Modal**: Small popup window that displays Google Forms
- **Responsive Design**: Works on all devices (desktop, tablet, mobile)
- **Modern UI**: Beautiful gradient design with smooth animations
- **Download Links**: Google Drive integration for file sharing

## How to Use the Google Form Modal

### 1. Update the Google Form URL

In `script.js`, find this line and replace it with your actual Google Form URL:

```javascript
const googleFormUrl = 'https://forms.google.com/your-form-id';
```

**To get your Google Form URL:**
1. Go to [Google Forms](https://forms.google.com)
2. Create or open your form
3. Click the "Send" button
4. Copy the form URL from the "Link" tab
5. Replace the placeholder URL in the code

### 2. Customize the Modal

The modal is fully customizable through CSS. You can modify:
- **Size**: Change `max-width` in `.modal-content`
- **Height**: Adjust `height` in `.modal-body iframe`
- **Colors**: Update the gradient in `.modal-header`
- **Positioning**: Modify margins and padding

### 3. Modal Controls

The modal can be controlled in several ways:
- **Open**: Click the floating Google Form button (bottom-right)
- **Close**: 
  - Click the × button
  - Click outside the modal
  - Press the Escape key

### 4. Responsive Behavior

The modal automatically adjusts for different screen sizes:
- **Desktop**: 600px max-width, 500px height
- **Tablet**: 95% width, 400px height  
- **Mobile**: 98% width, 350px height

## File Structure

```
waw/
├── index.html          # Main HTML with modal structure
├── styles.css          # CSS including modal styles
├── script.js           # JavaScript with modal functionality
└── README.md           # This file
```

## Customization Options

### Change Modal Title
Edit the title in `index.html`:
```html
<div class="modal-header">
    <h3>Your Custom Title</h3>
    <span class="close">&times;</span>
</div>
```

### Modify Modal Size
Update CSS in `styles.css`:
```css
.modal-content {
    max-width: 800px; /* Make it wider */
}

.modal-body iframe {
    height: 600px; /* Make it taller */
}
```

### Add Custom Styling
The modal uses CSS classes that you can easily customize:
- `.modal` - Main modal container
- `.modal-content` - Modal content wrapper
- `.modal-header` - Header with title and close button
- `.modal-body` - Body containing the iframe

## Browser Compatibility

The modal works in all modern browsers:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Troubleshooting

### Modal Not Opening
- Check that the Google Form URL is valid
- Ensure the modal HTML is properly loaded
- Check browser console for JavaScript errors

### Form Not Loading
- Verify the Google Form URL is accessible
- Check if the form requires authentication
- Ensure the form is published and public

### Mobile Issues
- Test on actual mobile devices
- Check viewport meta tag in HTML
- Verify touch event handling

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please check the code comments or create an issue in the repository. 