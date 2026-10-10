import {env} from '../env';
import {type Condition, matchers} from '.';

let rules: Array<Condition<string>> | undefined;

const disallow: Condition<string> = user => (rules ??= matchers(env.GHP_BLOCKED_USERS)).some(m => m(user));

export default disallow;
