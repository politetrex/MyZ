import { zwn } from '../../../data/zwn.js';
import { zwc } from '../../../data/zwc.js';
import { zwnTag } from '../zwn-tags.js';

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const mainDiv = document.getElementById('main');

if (id) {
    console.log("Loading work with id:", id);
    // load specific work
    const workData = zwn[id];
    if (workData) {
        document.title = workData.name + " -- 我的作文区";
        const titleElem = document.createElement('h1');
        titleElem.textContent = workData.name;
        mainDiv.appendChild(titleElem);
        
        const dateElem = document.createElement('p');
        const dateStr = workData.date.toString();
        dateElem.textContent = `${dateStr.slice(0,4)}-${dateStr.slice(4,6)}-${dateStr.slice(6,8)}`;
        mainDiv.appendChild(dateElem);

        const _zwn_contained = workData.class;
        if (_zwn_contained && _zwn_contained.length > 0) {
            //const br = document.createElement('br');
            //mainDiv.appendChild(br);
            
            const containedText = document.createTextNode('包含于: ');
            mainDiv.appendChild(containedText);
    
            _zwn_contained.forEach((cid, index) => {
                const centry = zwc[cid];
                const classLink = document.createElement('a');
                classLink.href = `./zwc.html?id=${cid}`;
                classLink.textContent = centry ? centry.title : "Unknown Class";
                
                mainDiv.appendChild(classLink);
                
                // Add comma between links (except last one)
                if (index < _zwn_contained.length - 1) {
                    const comma = document.createTextNode(', ');
                    mainDiv.appendChild(comma);
                }
            });
        }
        
        // Load and display the actual content
        const contentContainer = document.createElement('div');
        contentContainer.className = 'work-content';
        mainDiv.appendChild(contentContainer);
        
        workData.content.forEach(paragraph => {
            const pElem = document.createElement('p');
            pElem.textContent = paragraph;
            contentContainer.appendChild(pElem);
        });
    } else {
        mainDiv.textContent = "未找到该作文。";
        console.error("Work data not found for id:", id);
    }
} else {
    // Show all works
    console.log("Loading all works...");
    
    const titleElem = document.createElement('h1');
    titleElem.textContent = "所有作文";
    mainDiv.appendChild(titleElem);
    
    // Create mainDiv for all work links
    const worksContainer = document.createElement('div');
    worksContainer.className = 'works-list';
    mainDiv.appendChild(worksContainer);
    
    // Get all works and sort by date (newest first)
    const allWorks = Object.entries(zwn)
        .sort((a, b) => b[1].date - a[1].date);
    
    if (allWorks.length === 0) {
        worksContainer.textContent = "暂无作文。";
    } else {
        allWorks.forEach(([workId, workData]) => {
            // Use your zwnTag function to create each work link
            const workElement = zwnTag(workId);
            worksContainer.appendChild(workElement);
        });
    }
}