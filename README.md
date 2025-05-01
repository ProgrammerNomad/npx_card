# NPX Business Card - Nomad Programmer

A modern way to share your contact details through the terminal! 🚀

## Preview

```bash
npx nomadprogrammer
```

![NPX Card Preview](preview.gif)

## Features

- 🎨 Rainbow colored ASCII art logo
- 💫 Animated loading spinners
- 📝 Interactive typing effects
- 🔗 Quick access to social profiles
- 📅 Direct meeting scheduler
- 📧 Instant email contact
- 🎯 Command-line interface

## Tech Stack

- Node.js
- Inquirer.js for CLI interactions
- Chalk for colorful output
- Boxen for beautiful boxes
- Gradient-string for rainbow effects

## Create Your Own

1. Clone this repository:
```bash
git clone https://github.com/ProgrammerNomad/npx_card.git
cd npx_card
```

2. Install dependencies:
```bash
npm install
```

3. Test locally:
```bash
# Create symlink
npm link

# Run the card
npx nomadprogrammer

# Or run directly
node card.js
```

4. Customize `card.js`:
   - Update social media links
   - Change personal information
   - Modify ASCII art (visit: https://patorjk.com/software/taag/)
   - Customize colors using chalk
   - Add/remove menu options

5. Update `package.json`:
```json
{
  "name": "your-npm-username",
  "version": "1.0.0",
  "description": "A personal card for Your Name",
  "author": "Your Name <your@email.com>",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/your-username/npx_card.git"
  }
}
```

## Publishing to NPM

1. Create NPM account:
```bash
npm adduser
```

2. Login:
```bash
npm login
```

3. Test build:
```bash
# Remove existing links
npm unlink
npm uninstall -g nomadprogrammer

# Test installation
npm install -g .
```

4. Publish:
```bash
npm run pub
```

## Troubleshooting

- If you see EACCES errors, fix npm permissions
- For connection issues, check your npm configuration
- Run `npm doctor` to diagnose common problems

## License

ISC

## About the Author

Shiv Singh - Tech Architect & Business Owner
- 🌐 [Website](https://srapsware.com)
- 💼 [LinkedIn](https://linkedin.com/in/nomadprogrammer)
- 🐦 [Twitter](https://twitter.com/nomadprogrammer)
- 💻 [GitHub](https://github.com/ProgrammerNomad)

## Contributing

Pull requests are welcome! Feel free to contribute to make this template even better.

---

📝 Generated using ASCII art from [patorjk.com](https://patorjk.com/software/taag/)
Made with ❤️ by Nomad Programmer | Feel free to fork and create your own!