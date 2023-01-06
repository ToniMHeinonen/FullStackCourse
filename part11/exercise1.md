When you are building a project in Python, you could take care of the linting with Pylint. You can install Pylint in Windows with command "pip install pylint". You can enable linting in Visual Studio Code by opening the command palette and by selecting command "Python: Select Linter".

Testing can be done in multiple different ways. For unit tests you can use the "unittest" framework. You can also use other test frameworks like nose, nose2 or pytest. You can also write integration tests with these frameworks.

There is no need to build a Python project, since it is a interpreted language. You can skip this step in Python projects CI cycle.

There are multiple different options for CI pipeline other than GitHub Actions and Jenkins. You can also use services like Travis CI, CircleCI, AppVeyor, Cyclic, Earthly, Cycloid and MergeQueue.

Before deciding if self-hosted or cloud-based environment is better for the hypothetical project, we need to know more information about the project. Organization's available time, money and values affect the decision. Building a self-hosted environment takes a lot of time and expertise. It also takes a lot of time to manage it and keep the service healthy and functional. If the project does not have much spare time or if the CI requirements are simple, using cloud-based environment should be a safer bet.
