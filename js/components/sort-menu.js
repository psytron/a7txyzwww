
class SortMenu extends HTMLElement{

    constructor(){
        super()
        
        this.render()
    }

    render(){
        this.innerHTML = `
            <div id="sortmenu" style="position:absolute; right:-312px; top:83px;">
                <img id="adder" src="img/addbuttongreen.png" style="width:38px;"/>
                <img id="add_avatar" src="img/avatar_icon.png" style="width:38px;"/>
                <img id="add_office" src="img/office_icon.png" style="width:38px;"/>
                <img id="add_asset" src="img/asset_icon.png" style="width:38px;"/>
                <img id="add_task" src="img/task_icon.png" style="width:38px;"/>
                <img id="add_idea" src="img/idea_icon.png" style="width:38px;"/>
                <img id="add_contract" src="img/contract_icon.png" style="width:38px;"/>
            </div>`
    }


}

customElements.define('sort-menu', SortMenu );