// This program uses stack based approach

#include <iostream>
#include <vector>
#include <stack>
using namespace std;

class browserHistory
{
private:
    stack<string> back;
    stack<string> forward;
    string current = "Home";
    vector<string> urls = {"google.com", "facebook.com", "youtube.com"};
    // here f means forward, b means back and v means visit
    vector<char> commands = {'b', 'v', 'b', 'v', 'b', 'b', 'f', 'f', 'v'};

public:
    void operationsAndSites()
    {
        // pointer which points to current url
        int i = 0;
        for (char command : commands)
        {
            if (command == 'v' && i >= urls.size())
            {
                cout << "Error 404" << endl << endl;
                return;
            }

            if (command == 'v')
            {
                // If nothing to forward then just push it
                if (forward.empty())
                {
                    back.push(current);
                    current = urls[i++];
                    cout << back.top() << " is pushed in back and current URL is " << current << endl << endl;
                }
                // if forward is not empty and new url is not equals forward then clear forward
                else if (urls[i] != forward.top())
                {
                    back.push(current);
                    current = urls[i++];
                    while (!forward.empty())
                    {
                        forward.pop();
                    }
                    cout << back.top() << " is pushed in back and new URL is " << current << endl << endl;
                }
            }
            else if (command == 'f')
            {
                if (forward.empty())
                {
                    cout << "No forward available" << endl << endl;
                    continue;
                }
                else
                {
                    back.push(current);
                    current = forward.top();
                    forward.pop();
                    cout << "Previous URL is " << back.top() << " . Current URL is " << current << endl << endl;
                }
            }
            else if (command == 'b')
            {
                if (back.empty())
                {
                    cout << "No back available" << endl << endl;
                    continue;
                }
                else
                {
                    forward.push(current);
                    current = back.top();
                    back.pop();
                    cout << "Next URL is " << forward.top() << " . Current URL is " << current << endl << endl;
                }
            }
        }
    }
};

int main()
{
    browserHistory b;
    b.operationsAndSites();
}
