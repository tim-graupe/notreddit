import { style } from "@mui/system";
import React, {useEffect, useState} from "react";
import SubmitImage from "./submitImage";
import SubmissionModal from "./submitPost";

export function NewSubmission(props) {
    const [postType, setPostType] = useState("")

        useEffect(() => {
            const checkPostType = () => {
                if (postType === "image") {
                    document.getElementById('submitPost').style.display = 'none'
                    document.getElementById('submitImg').style.display = 'block'


                } else if (postType === "text") {
                    document.getElementById('submitImg').style.display = 'none'
                    document.getElementById('submitPost').style.display = 'block'

                } else {
                    document.getElementById('submitImg').style.display = 'none'
                    document.getElementById('submitPost').style.display = 'none'
                }
            }
            checkPostType()
        })

    function onChangeValue
    (e) {
        setPostType(e.target.value)
    }
    return (
        <div>
        <div onChange={onChangeValue}>
            <input type="radio" value="image" name="type" /> Image
            <input type="radio" value="text" name="type"/> Text
            </div>
        <div id="submitImg">
            <SubmitImage currentSub={props.currentSub}  />
        </div>
        <div id="submitPost">
        <SubmissionModal currentSub={props.currentSub} />
        </div>
        </div>
    )
}