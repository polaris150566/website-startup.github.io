import { imagePath } from "../../utils/fetch";

import template from "./index.eft";
import _commonbackground from './commonBackground2.jpg';
const commonbackground = imagePath( _commonbackground );

import _engineer_center from './engineer_center.png';
const engineer_center = imagePath( _engineer_center );
import _engineer_cover from './engineer_cover.png';
const engineer_cover = imagePath( _engineer_cover );

import _proofofconcept_center from './proofofconcept_center.png';
const proofofconcept_center = imagePath( _proofofconcept_center );
import _proofofconcept_cover from './proofofconcept_cover.png';
const proofofconcept_cover = imagePath( _proofofconcept_cover );

import _attribution_center from './attribution_center.png';
const attribution_center = imagePath( _attribution_center );

import _protocols_center from './protocols_center.png';
const protocols_center = imagePath( _protocols_center );

import _members_center from './members_center.png';
const members_center = imagePath( _members_center );
import _members_cover from './members_cover.png';
const members_cover = imagePath( _members_cover );

import _safety_center from './safety_center.png';
const safety_center = imagePath( _safety_center );
import _safety_cover from './safety_cover.png';
const safety_cover = imagePath( _safety_cover );

import _part_center from './part_center.png';
const part_center = imagePath( _part_center );
import _part_cover from './part_cover.png';
const part_cover = imagePath( _part_cover );

import _experiment_center from './experiment_center.png';
const experiment_center = imagePath( _experiment_center );


import _description_center from './description_center.png';
const description_center = imagePath( _description_center );


import _contribution_center from './contribution_center.png';
const contribution_center = imagePath( _contribution_center );

import _result_center from './result_center.png';
const result_center = imagePath( _result_center );

import _common_cover from './common_cover.png';
const common_cover = imagePath( _common_cover );

import _drylab_center from './drylab_center.png';
const drylab_center = imagePath( _drylab_center );

import _notebook_center from './notebook_center.png';
const notebook_center = imagePath( _notebook_center );

console.log( commonbackground );
class CoverT extends template{
	constructor( str ){
		super();
		let coverurl, centerurl;
		switch( str ){
		case 'engineer':
			coverurl  = engineer_cover;
			centerurl = engineer_center;
			break;
		case 'proof of cencept':
			coverurl  = proofofconcept_cover;
			centerurl = proofofconcept_center;
			break;
		case 'attribution':
			coverurl  = common_cover;
			centerurl = attribution_center;
			break;
		case 'members':
			coverurl  = members_cover;
			centerurl = members_center;
			break;
		case 'safety':
			coverurl  = safety_cover;
			centerurl = safety_center;
			break;
		case 'parts':
			coverurl  = part_cover;
			centerurl = part_center;
			break;
		case 'experiment':
			coverurl  = common_cover;
			centerurl = experiment_center;
			break;
		case 'description':
			coverurl  = common_cover;
			centerurl = description_center;
			break;
		case 'contribution':
			coverurl  = common_cover;
			centerurl = contribution_center;
			break;
		case 'result':
			coverurl  = common_cover;
			centerurl = result_center;
			break;
		case 'drylab':
			coverurl  = common_cover;
			centerurl = drylab_center;
			break;
		case 'protocols':
			coverurl  = common_cover;
			centerurl = protocols_center;
			break;
		case 'notebook':
			coverurl  = common_cover;
			centerurl = notebook_center;
			break;
		default:
			throw console.log( 'nothing to match!' );
		};
		this.$data.cover  = coverurl;
		this.$data.center = centerurl;
		this.$data.title  = str;

	}
	mount(){
		this.$mount( {
			target: document.body,
			option: 'append'
		} );
	}
}

export default CoverT;
