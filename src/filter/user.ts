import {type Condition, matcher} from '.';

const users: string[] = (process.env.GHP_BLOCKED_USERS as string | undefined ?? '').split(',');
const rules = users.map(pattern => matcher(pattern));

const disallow: Condition<string> = user => rules.some(m => m(user));

export default disallow;
