/**
 * @license
 * Copyright (C) 2021 UoM - University of Macedonia
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */

import * as React from 'react';
import { injectable, postConstruct, inject } from 'inversify';
import { AlertMessage } from '@theia/core/lib/browser/widgets/alert-message';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core';
import { CommandService } from '@theia/core/lib/common/command';
import { messageTypes, buildMessage } from '@unparallel/smartclide-frontend-comm';

@injectable()
export class SmartclideServiceCreationTheiaWidget extends ReactWidget {

    static readonly ID = 'smartclide-service-creation-theia:widget';
    static readonly LABEL = 'Smartclide Service Creation';
	static state = {
		stateServiceURL: '',
		stateName: '',
		stateGitlabURL: '',
		stateGitlabToken: '',
		stateProjectVisibility: '',
		stateDescription: '',
		stateJenkinsURL: '',
		stateJenkinsUser: '',
		stateJenkinsToken: '',
		stateKeycloakToken: ''
	};

	//Handle TOKEN_INFO message from parent
	handleTokenInfo = ({data}:any) => {
    switch (data.type) {
      case messageTypes.TOKEN_INFO:
        console.log("RECEIVED", JSON.stringify(data, undefined, 4));
        SmartclideServiceCreationTheiaWidget.state.stateKeycloakToken = data.content;
        break;
      case messageTypes.TOKEN_REVOKE:
        console.log("RECEIVED", JSON.stringify(data, undefined, 4));
        window.removeEventListener("message", this.handleTokenInfo);
        break;
      default:
        break;
    }
	}

    @inject(MessageService)
    protected readonly messageService!: MessageService;

	@inject(CommandService)
    protected readonly commandService: CommandService;

    @postConstruct()
    protected async init(): Promise < void> {
        this.id = SmartclideServiceCreationTheiaWidget.ID;
        this.title.label = SmartclideServiceCreationTheiaWidget.LABEL;
        this.title.caption = SmartclideServiceCreationTheiaWidget.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'fa fa-cogs';

        this.update();

		//Add even listener to get the Keycloak Token
		window.addEventListener("message", this.handleTokenInfo);

		//Send a message to inform SmartCLIDE IDE
		let message = buildMessage(messageTypes.COMPONENT_HELLO);
		window.parent.postMessage(message, "*");
    }

    protected render(): React.ReactNode {
        const header = `Provide the GitLab project configuration details.`;

		return <div id='widget-container-ServiceCreation'>
            <AlertMessage type='INFO' header={header} />
            <div id='info'>
				<table>
					<tbody>
					  <tr>
						<td className='cellID'>Service Creation URL</td>
						<td>
							<input onChange={this.updateInput} placeholder='Service' name='stateServiceURL'/>
						</td>
					  </tr>
					  <tr>
						<td className='cellID'>GitLab Server URL</td>
						<td>
							<input onChange={this.updateInput} placeholder='URL' name='stateGitlabURL'/>
						</td>
					  </tr>
					  <tr>
						<td className='cellID'>GitLab Token</td>
						<td>
							<input type='password' onChange={this.updateInput} placeholder='Token' name='stateGitlabToken'/>
						</td>
					  </tr>
					  <tr>
						<td className='cellID'>Project Name</td>
						<td>
							<input onChange={this.updateInput} maxLength={100} placeholder='Name' name='stateName'/>
						</td>
					  </tr>
					  <tr>
						<td className='cellID'>Project Visibility</td>
						<td id='radio_buttons'>
							<input className='inputRadio' type="radio" id="visibility1" name="visibility" value="0" onChange={this.onValueChange}/>
							<label htmlFor="visibility1">public</label>
							<input className='inputRadio' type="radio" id="visibility2" name="visibility" value="1" onChange={this.onValueChange}/>
							<label htmlFor="visibility2">internal</label>
							<input className='inputRadio' type="radio" id="visibility3" name="visibility" value="2" onChange={this.onValueChange}/>
							<label htmlFor="visibility3">private</label>
						</td>
					  </tr>
					  <tr>
						<td className='cellID'>Description</td>
						<td>
							<textarea id="textDescription" onChange={this.updateInputTextArea} rows={2}></textarea>
						</td>
					  </tr>
					</tbody>
				</table>
				<label>
					<input type="checkbox" onChange={this.onCheckBoxChange}/>Use Jenkins
				</label>
				<table id='jenkins' style={{display: 'none'}}>
					<tbody>
				      <tr>
						<td className='cellID'>Jenkins Server Url</td>
						<td>
							<input onChange={this.updateInput} placeholder='URL' name='stateJenkinsURL'/>
						</td>
					  </tr>
					  <tr>
						<td className='cellID'>Jenkins Username</td>
						<td>
							<input onChange={this.updateInput} maxLength={100} placeholder='Username' name='stateJenkinsUser'/>
						</td>
					  </tr>
					  <tr>
						<td className='cellID'>Jenkins Token</td>
						<td>
							<input type='password' onChange={this.updateInput} placeholder='Token' name='stateJenkinsToken'/>
						</td>
					  </tr>
					</tbody>
				</table>
            </div>
			<button className='theia-button secondary' title='Create' onClick={_a => this.runprocess()}>Run</button>
			<div id='waitAnimation' className="lds-dual-ring"></div>
			<i id='message'></i>
		</div>
    }

    protected async runprocess() {
		console.log('...');
		console.log(SmartclideServiceCreationTheiaWidget.state.stateKeycloakToken);
		console.log('...');

		//if all the fields have values
		if(SmartclideServiceCreationTheiaWidget.state.stateServiceURL!='' &&
		   SmartclideServiceCreationTheiaWidget.state.stateName!='' && SmartclideServiceCreationTheiaWidget.state.stateGitlabURL!='' &&
		   SmartclideServiceCreationTheiaWidget.state.stateGitlabToken!='' && SmartclideServiceCreationTheiaWidget.state.stateProjectVisibility!='' &&
		   SmartclideServiceCreationTheiaWidget.state.stateDescription!='' && (document.getElementById("jenkins") as HTMLElement).style.display=="none")
		{
			//waiting animation start
			(document.getElementById("waitAnimation") as HTMLElement).style.display = "block";

			//post request
			fetch(SmartclideServiceCreationTheiaWidget.state.stateServiceURL+'/createStructure', {
				method: 'post',
				headers: {
					'Accept': '*/*',
					'Access-Control-Allow-Origin': '*',
					'Authorization': 'Bearer ' + SmartclideServiceCreationTheiaWidget.state.stateKeycloakToken,
					'projectName' : SmartclideServiceCreationTheiaWidget.state.stateName,
					'gitLabServerURL' : SmartclideServiceCreationTheiaWidget.state.stateGitlabURL,
					'gitlabToken' : SmartclideServiceCreationTheiaWidget.state.stateGitlabToken,
					'projVisibility' : SmartclideServiceCreationTheiaWidget.state.stateProjectVisibility,
					'projDescription' : SmartclideServiceCreationTheiaWidget.state.stateDescription
				}
			}).then(res => res.json())
			  .then((out) => {
					var obj = JSON.parse(JSON.stringify(out));

					//waiting animation stop
					(document.getElementById("waitAnimation") as HTMLElement).style.display = "none";

					//show message get from service
					(document.getElementById("message") as HTMLElement).style.display = "block";
					(document.getElementById('message') as HTMLElement).innerHTML = obj.message;

					//check post request status
					if (obj.status==0){
						this.messageService.info('Successful Execution');
						//Create dir and clone
						this.createAndClone(obj.message);
					}
					else{
						this.messageService.info('Error In Execution');
					}
			  })
			  .catch(err => {
				(document.getElementById("waitAnimation") as HTMLElement).style.display = "none";
				console.log('err: ', err);
				(document.getElementById("message") as HTMLElement).style.display = "block";
				(document.getElementById('message') as HTMLElement).innerHTML = 'Error With Service';
			  });
		}
		else if(SmartclideServiceCreationTheiaWidget.state.stateServiceURL!='' &&
		  SmartclideServiceCreationTheiaWidget.state.stateName!='' && SmartclideServiceCreationTheiaWidget.state.stateGitlabURL!='' &&
		  SmartclideServiceCreationTheiaWidget.state.stateGitlabToken!='' && SmartclideServiceCreationTheiaWidget.state.stateProjectVisibility!='' &&
		  SmartclideServiceCreationTheiaWidget.state.stateDescription!='' && SmartclideServiceCreationTheiaWidget.state.stateJenkinsURL!='' &&
		  SmartclideServiceCreationTheiaWidget.state.stateJenkinsUser!='' && SmartclideServiceCreationTheiaWidget.state.stateJenkinsToken!='' &&
		  (document.getElementById("jenkins") as HTMLElement).style.display=="block")
		{
			//waiting animation start
			(document.getElementById("waitAnimation") as HTMLElement).style.display = "block";

			//post request
			fetch(SmartclideServiceCreationTheiaWidget.state.stateServiceURL+'/createStructure', {
				method: 'post',
				headers: {
					'Accept': '*/*',
					'Access-Control-Allow-Origin': '*',
					'projectName' : SmartclideServiceCreationTheiaWidget.state.stateName,
					'gitLabServerURL' : SmartclideServiceCreationTheiaWidget.state.stateGitlabURL,
					'gitlabToken' : SmartclideServiceCreationTheiaWidget.state.stateGitlabToken,
					'projVisibility' : SmartclideServiceCreationTheiaWidget.state.stateProjectVisibility,
					'projDescription' : SmartclideServiceCreationTheiaWidget.state.stateDescription,
					'jenkinsServerUrl' : SmartclideServiceCreationTheiaWidget.state.stateJenkinsURL,
					'jenkinsUsername' : SmartclideServiceCreationTheiaWidget.state.stateJenkinsUser,
					'jenkinsToken' : SmartclideServiceCreationTheiaWidget.state.stateJenkinsToken
				}
			}).then(res => res.json())
			  .then((out) => {
					var obj = JSON.parse(JSON.stringify(out));

					//waiting animation stop
					(document.getElementById("waitAnimation") as HTMLElement).style.display = "none";

					//show message get from service
					(document.getElementById("message") as HTMLElement).style.display = "block";
					(document.getElementById('message') as HTMLElement).innerHTML = obj.message;

					//check post request status
					if (obj.status==0){
						this.messageService.info('Successful Execution');
						//Create dir and clone
						this.createAndClone(obj.message);
					}
					else{
						this.messageService.info('Error In Execution');
					}
			  })
			  .catch(err => {
				(document.getElementById("waitAnimation") as HTMLElement).style.display = "none";
				console.log('err: ', err);
				(document.getElementById("message") as HTMLElement).style.display = "block";
				(document.getElementById('message') as HTMLElement).innerHTML = 'Error With Service';
			  });
		}
		else{
			(document.getElementById("message") as HTMLElement).style.display = "none";
			this.messageService.info('Provide values for all fields');
		}
    }

	//create dir and clone
	createAndClone(message: String){
		//Create dir and clone
		(async () => {
			try {
				//Clone
				let gitClone= 'https://oauth2:' + SmartclideServiceCreationTheiaWidget.state.stateGitlabToken
									+ '@' + message.replace('https://','');
				this.commandService.executeCommand('git.clone', gitClone);

				//go to Open Folder
				this.commandService.executeCommand('workspace:open');
			} catch(e) {
				this.messageService.info('Error in git clone');
			}
		})();
	}

	//update the state
	updateInput (e: React.ChangeEvent<HTMLInputElement>) {
		const key =e.currentTarget.name as keyof typeof SmartclideServiceCreationTheiaWidget.state
		SmartclideServiceCreationTheiaWidget.state[key] = e.currentTarget.value;
    }

	//update for text
	updateInputTextArea (e: React.ChangeEvent<HTMLTextAreaElement>) {
		SmartclideServiceCreationTheiaWidget.state.stateDescription = e.currentTarget.value;
    }

	//update for radio group
	onValueChange(event: React.ChangeEvent<HTMLInputElement>) {
		SmartclideServiceCreationTheiaWidget.state.stateProjectVisibility= event.target.value;
	}

	//update Jenkins visibility
	onCheckBoxChange(e: React.ChangeEvent<HTMLInputElement>) {
		if(e.target.checked){
			(document.getElementById("jenkins") as HTMLElement).style.display = "block";
		}
		else{
			(document.getElementById("jenkins") as HTMLElement).style.display = "none";
		}
	 }
}
