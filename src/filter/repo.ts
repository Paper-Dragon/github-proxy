import {type Condition, matcher} from '.';

type Repo = {
	user: string;
	repo: string;
};

const repos: string[] = (process.env.GHP_BLOCKED_REPOS as string | undefined ?? '').split(',');
const rules = repos.map(pattern => matcher(pattern));

const forbid: Condition<Repo> = ({user, repo}) => rules.some(m => m(`${user}/${repo}`));

export default forbid;
