import { Plugin, } from 'obsidian';
const dayjs = require('dayjs');


interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		// const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', () => {
		// 	// Called when the user clicks the icon.
		// 	new Notice('This is a notice!');
		// });


		this.addCommand({
			id: 'template-week-note',
			name: 'Create Week Note',
			callback: async () => {
        const lastSunday = dayjs().subtract(dayjs().day(), 'day')
        const start = lastSunday.add(1, 'day')
        const end = lastSunday.add(7, 'day')
        
        const content = `
# Outcomes

# Week notes
- [[daily-notes/${start.format('YYYY-MM-DD|YYYY-MM-DD')}]]: ![[daily-notes/${start.format('YYYY-MM-DD')}#Outcomes|${start.format('YYYY-MM-DD')}]]

- [[daily-notes/${start.add(1,'day').format('YYYY-MM-DD|YYYY-MM-DD')}]]: ![[daily-notes/${start.add(1, 'day').format('YYYY-MM-DD')}#Outcomes|${start.add(1, 'day').format('YYYY-MM-DD')}]]

- [[daily-notes/${start.add(2, 'day').format('YYYY-MM-DD|YYYY-MM-DD')}]]: ![[daily-notes/${start.add(2, 'day').format('YYYY-MM-DD')}#Outcomes|${start.add(2, 'day').format('YYYY-MM-DD')}]]

- [[daily-notes/${start.add(3, 'day').format('YYYY-MM-DD|YYYY-MM-DD')}]]: ![[daily-notes/${start.add(3, 'day').format('YYYY-MM-DD')}#Outcomes|${start.add(3, 'day').format('YYYY-MM-DD')}]]

- [[daily-notes/${start.add(4, 'day').format('YYYY-MM-DD|YYYY-MM-DD')}]]: ![[daily-notes/${start.add(4, 'day').format('YYYY-MM-DD')}#Outcomes|${start.add(4, 'day').format('YYYY-MM-DD')}]]
        `

        const fileName = `daily-notes/${start.format('YYYY-MM-DD')} - ${end.format('YYYY-MM-DD')}.md`
        const file = await this.app.vault.create(fileName, content)
        this.app?.workspace?.activeLeaf?.openFile(file)
			}
		});

    this.addCommand({
      id: 'insert-week-note-title',
      name: 'Insert Week Note Title',
      editorCallback: (editor) => {
        const lastSunday = dayjs().subtract(dayjs().day(), 'day')
        const start = lastSunday.add(1, 'day')
        const end = lastSunday.add(7, 'day')
        
        const fileName = `${start.format('YYYY-MM-DD')} - ${end.format('YYYY-MM-DD')}`
				editor.replaceSelection(fileName);
			},
    })
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}


