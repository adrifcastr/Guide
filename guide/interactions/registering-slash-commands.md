# Registering slash commands

Discord provides users the option to create client-integrated slash commands. In this section you will be learning how to register these commands using discord.js!

::: tip
If you already have slash commands set-up for your application and want to learn to respond to them, refer to [the following page](/interactions/replying-to-slash-commands/).
:::


## Global commands

First up, we'll introduce you to global application commands, these type of commands will be available on every guild your application is authorized on with the `applications.commands` oauth scope and are also available in its DMs.

::: warning
Global commands are cached for one hour. That means that new global commands will fan out slowly across all guilds, and will be guaranteed to be updated in an hour. Guild commands update instantly. We recommend you use guild commands for quick testing, and global commands when they're ready for public use.
:::

So, to register a global command we will be passing an `ApplicationCommandData` object to the `ApplicationCommandManager.create()` method as follows:

```js
client.once('ready', async () => {
	const commanddata = {
		name: 'ping',
		description: 'Replies with Pong!'
	};

	const command = await client.application?.commands.create(commanddata);
	console.log(command);
});
```

That's it! You've successfully created your first global application command! Let's move on to guild specific commands.


## Guild commands

Guild specific application commands are only available in the guild they have been created in, as such we will be using `GuildApplicationCommandManager.create()` to create them:

```js{7}
client.once('ready', async () => {
	const commanddata = {
		name: 'ping',
		description: 'Replies with Pong!'
	};

	const command = await client.guilds.cache.get('id')?.commands.create(commanddata);
	console.log(command);
});
```

Excellent! Now you've learned how to register guild specific application commands. We're not done yet, there's still a few more topics to cover, keep reading!


## Bulk-update commands

If you for example deploy your application commands when starting your application, you may want to update all commands and their changes at once. You can do this by passing an array of `ApplicationCommandData` objects to the `set()` method on either of the managers you've been introduced to above: 

::: danger
This will overwrite all existing commands on the application or guild with the new data you provided!
:::

```js{2-11,13-14}
client.once('ready', async () => {
	const commanddata = [
		{
			name: 'ping',
			description: 'Replies with Pong!'
		},
		{
			name: 'pong',
			description: 'Replies with Ping!'
		}
	];

	const commands = await client.application?.commands.set(commanddata);
	console.log(commands);
});
```

Perfect! You have now learned how to bulk-update application commands. 


## Options

Application commands can have `options`, think of these options like arguments to a function. You can specify them as seen below:

```js{5-10}
client.once('ready', async () => {
	const commanddata = {
		name: 'echo',
		description: 'Replies with your input!',
		options: [{
    		name: 'input',
    		type: 'STRING',
    		description: 'The input which should be echoed back',
    		required: true
		}]
	};

	const command = await client.application?.commands.create(commanddata);
	console.log(command);
});
```

Notice how we specified `required: true` within the options object? Doing this will make the option a required field and will prevent the user from sending the command without specifying a value for this option!

Now you've learned how to create an application command with `options`. Keep reading, we have one more section to cover!

## Option types

As you've seen in the example of the last section we can specify the `type` of an `ApplicationCommandOption`. Listed below you'll find a list of all possible values you can pass as `ApplicationCommandOptionType`:

* `SUB_COMMAND` sets the option to be a sub-command
* `SUB_COMMAND_GROUP` sets the option to be a sub-command-group
* `STRING` sets the option to require a string value
* `INTEGER` sets the option to require an integer value
* `BOOLEAN` sets the option to require a boolean value
* `USER` sets the option to require a user or snowflake as value
* `CHANNEL` sets the option to require a channel or snowflake as value
* `ROLE` sets the option to require a role or snowflake as value