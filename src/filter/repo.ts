import {env} from '../env';
import {type Condition, matchers} from '.';

type Repo = {
	user: string;
	repo: string;
};

let rules: Array<Condition<string>> | undefined;

const forbid: Condition<Repo> = ({user, repo}) => (rules ??= matchers(env.GHP_BLOCKED_REPOS)).some(m => m(`${user}/${repo}`));

export default forbid;
