import { zwc } from '../../data/zwc.js';
import { zwn } from '../../data/zwn.js';

export function zwnTag(id) {
    const entry = zwn[id];
    if (!entry) {
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Tag not found';
        return errorDiv;
    }

    const zwn_name = entry.name;
    const zwn_date = entry.date;  // Fixed typo: was zwm_date
    const _zwn_contained = entry.class;

    // Create main container
    const container = document.createElement('div');
    
    // Create main link
    const mainLink = document.createElement('a');
    mainLink.href = `./zwn.html?id=${id}`;
    mainLink.textContent = zwn_name;
    
    // Create date text
    const dateText = document.createTextNode(` · 创建于${zwn_date}`);
    
    // Add main link and date to container
    container.appendChild(mainLink);
    container.appendChild(dateText);

    // Handle contained classes
    if (_zwn_contained && _zwn_contained.length > 0) {
        const br = document.createElement('br');
        container.appendChild(br);
        
        const containedText = document.createTextNode('包含于: ');
        container.appendChild(containedText);

        _zwn_contained.forEach((cid, index) => {
            const centry = zwc[cid];
            const classLink = document.createElement('a');
            classLink.href = `./zwc.html?id=${cid}`;
            classLink.textContent = centry ? centry.title : "Unknown Class";
            
            container.appendChild(classLink);
            
            // Add comma between links (except last one)
            if (index < _zwn_contained.length - 1) {
                const comma = document.createTextNode(', ');
                container.appendChild(comma);
            }
        });
    }

    return container; // Now returns a DOM Node
}