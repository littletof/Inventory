import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';
@Component({
    selector: 'upload-form',
    templateUrl: './upload-form.component.html',
    styleUrls: ['./upload-form.component.css'],

    inputs: ['imageName'],
    outputs: ['hasFile', 'error']
})
export class UploadFormComponent {
    imageName: string;
    hasFile: EventEmitter<any> = new EventEmitter();
    error: EventEmitter<any> = new EventEmitter();


    fileName:string;
    selectedFiles: FileList;
    currentUpload: Upload;
    constructor(private upSvc: UploadService) { }


    detectFiles(event) {
        this.selectedFiles = event.target.files;

        this.selectedFiles && (this.fileName = this.selectedFiles.item(0).name);
        this.hasFile.next(true);
    }

    clear(){
        //this.selectedFiles = null;
        this.fileName = null;

        this.hasFile.next(false);
    }


    uploadSingle() {
        if(!this.fileName){
            this.error.next({error:true, msg:'nothing to upload'});
            return;
        }

        let file = this.selectedFiles.item(0)
        this.currentUpload = new Upload(file, this.imageName+this.getExtention());
        this.upSvc.pushUpload(this.currentUpload)
    }

    private getExtention():string{
        let fname = this.selectedFiles.item(0).name;
        console.log(fname.substring(fname.lastIndexOf("."), fname.length));
        return ".png";
    }

}