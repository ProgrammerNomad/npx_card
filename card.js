#!/usr/bin/env node

'use strict'

import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";
import clear from "clear";
import open from "open";
import fs from 'fs';
import request from 'request';
import path from 'path';
import ora from 'ora';
import cliSpinners from 'cli-spinners';
import gradient from 'gradient-string';

clear();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const typeText = async (text, speed = 50) => {
    process.stdout.write('\r');
    for (const char of text) {
        process.stdout.write(char);
        await sleep(speed);
    }
    console.log('\n');
};

const logo = gradient(['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF'])(`
    ███╗   ██╗ ██████╗ ███╗   ███╗ █████╗ ██████╗ 
    ████╗  ██║██╔═══██╗████╗ ████║██╔══██╗██╔══██╗
    ██╔██╗ ██║██║   ██║██╔████╔██║███████║██║  ██║
    ██║╚██╗██║██║   ██║██║╚██╔╝██║██╔══██║██║  ██║
    ██║ ╚████║╚██████╔╝██║ ╚═╝ ██║██║  ██║██████╔╝
    ╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝ 
                                                    
    ██████╗ ██████╗  ██████╗  ██████╗ ██████╗  █████╗ ███╗   ███╗███╗   ███╗███████╗██████╗ 
    ██╔══██╗██╔══██╗██╔═══██╗██╔════╝ ██╔══██╗██╔══██╗████╗ ████║████╗ ████║██╔════╝██╔══██╗
    ██████╔╝██████╔╝██║   ██║██║  ███╗██████╔╝███████║██╔████╔██║██╔████╔██║█████╗  ██████╔╝
    ██╔═══╝ ██╔══██╗██║   ██║██║   ██║██╔══██╗██╔══██║██║╚██╔╝██║██║╚██╔╝██║██╔══╝  ██╔══██╗
    ██║     ██║  ██║╚██████╔╝╚██████╔╝██║  ██║██║  ██║██║ ╚═╝ ██║██║ ╚═╝ ██║███████╗██║  ██║
    ╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝
`);

const prompt = inquirer.prompt;

const openLink = async (url, message) => {
    const spinners = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let i = 0;
    const spin = setInterval(() => {
        process.stdout.write(`\r${spinners[i]} Loading...`);
        i = (i + 1) % spinners.length;
    }, 80);

    await open(url);
    clearInterval(spin);
    process.stdout.write('\r✓ ' + message + '\n');
};

const questions = [
    {
        type: "list",
        name: "action",
        message: "🤔 What would you like to do?",
        choices: [
            {
                name: `📧 Send me an ${chalk.green.bold("email")}?`,
                value: async () => {
                    await typeText('📬 Opening your email client...');
                    open("mailto:shiv@srapsware.com");
                    console.log(chalk.green.bold("\n✓ Ready to receive your message!\n"));
                }
            },
            {
                name: `📅 Schedule a ${chalk.redBright.bold("Meeting")}?`,
                value: async () => {
                    await typeText('🗓️ Opening my calendar...');
                    await openLink('https://calendly.com/nomadprogrammer/30min', 
                        'Calendar opened in your browser');
                }
            },
            {
                name: `💼 Check my ${chalk.blue.bold("LinkedIn")}?`,
                value: async () => {
                    await typeText('🔗 Redirecting to LinkedIn...');
                    await openLink('https://linkedin.com/in/nomadprogrammer', 
                        'LinkedIn profile opened in your browser');
                }
            },
            {
                name: "👋 Exit",
                value: async () => {
                    await typeText('Thanks for stopping by! Have a great day! 👋');
                }
            }
        ]
    }
];

const data = {
    name: gradient(['#00ff00', '#00ffff', '#0000ff']).multiline("             Shiv Singh"),
    handle: chalk.white("@nomadprogrammer"),
    work: `${chalk.white("Tech Architect & Business Owner at")} ${chalk
        .hex("#2b82b2")
        .bold("SrapWare")}`,
    twitter: chalk.gray("https://twitter.com/") + chalk.cyan("nomadprogrammer"),
    github: chalk.gray("https://github.com/") + chalk.green("ProgrammerNomad"),
    linkedin: chalk.gray("https://linkedin.com/in/") + chalk.blue("nomadprogrammer"),
    npx: chalk.red("npx") + " " + chalk.white("nomadprogrammer"),

    labelWork: chalk.white.bold("       Work:"),
    labelTwitter: chalk.white.bold("    Twitter:"),
    labelGitHub: chalk.white.bold("     GitHub:"),
    labelLinkedIn: chalk.white.bold("   LinkedIn:"),
    labelCard: chalk.white.bold("       Card:")
};

const me = boxen(
    [
        `${data.name}`,
        ``,
        `${data.labelWork}  ${data.work}`,
        ``,
        `${data.labelTwitter}  ${data.twitter}`,
        `${data.labelGitHub}  ${data.github}`,
        `${data.labelLinkedIn}  ${data.linkedin}`,
        ``,
        `${data.labelCard}  ${data.npx}`,
        ``,
        `${chalk.italic(
            "Tech Architect specializing in AI, ML, DevOps, and Cloud Infrastructure"
        )}`,
        `${chalk.italic(
            "Expert in AWS, GCP, Azure, Big Data, and DNS Solutions"
        )}`,
        `${chalk.italic(
            "Looking to connect with talented developers and discuss opportunities"
        )}`,
        `${chalk.italic(
            "Reach out through any of the channels above to start a conversation"
        )}`
    ].join("\n"),
    {
        margin: 1,
        float: 'center',
        padding: 1,
        borderStyle: "single",
        borderColor: "green"
    }
);

const tip = [
    `Tip: Try ${chalk.cyanBright.bold(
        "cmd/ctrl + click"
    )} on the links above`,
    '',
].join("\n");

const asciiCredit = [
    ``,
    `${chalk.dim("// Generate your own ASCII art at:")} ${chalk.blue.underline("https://patorjk.com/software/taag/")}`,
    ``
].join("\n");

// Wrap the execution code in an async IIFE
(async () => {
    console.log(logo);
    await typeText('Welcome to my interactive business card! 🚀', 100);
    console.log(me);
    console.log(tip);
    console.log(asciiCredit);

    const answers = await prompt(questions);
    await answers.action();
})().catch(console.error);
