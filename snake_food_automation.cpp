#include <iostream>
#include <vector>
#include <thread>
#include <chrono>
#include <cstdlib>
#include <ctime>

using namespace std;

void printGrid(vector<vector<int>> vec)
{
    for (int i = 0; i < vec.size(); i++)
    {
        for (int j = 0; j < vec[0].size(); j++)
        {
            cout << vec[i][j] << " ";
        }
        cout << endl;
    }
}

pair<int, int> findFoodLocation(vector<vector<int>> vec)
{
    int row = vec.size();
    int col = vec[0].size();
    int startY = 0, endY = row - 1;

    pair<int, int> pos = {-1, -1};

    int xPos, yPos;
    bool foodFound = false;

    while ((startY <= row / 2) && (endY >= row / 2))
    {
        int startX = 0, endX = col - 1;
        while ((startX < col) && (endX >= 0))
        {
            if (vec[startY][startX] == 2)
            {
                pos = {startY, startX};
                foodFound = true;
                break;
            }
            else if (vec[endY][endX] == 2)
            {
                pos = {endY, endX};
                foodFound = true;
                break;
            }

            startX++;
            endX--;
        }

        if (foodFound)
        {
            break;
        }
        startY++;
        endY--;
    }

    return pos;
}

void foodAtRandomPos(vector<vector<int>> &vec)
{
    while (true)
    {
        int randomX = rand() % 5;
        int randomY = rand() % 5;

        if (vec[randomX][randomY] == 0)
        {
            vec[randomX][randomY] = 2;
            break;
        }
    }
}

void snakeToFood(vector<vector<int>> &vec, int &snakeXpos, int &snakeYpos, char &direction)
{
    // Y = row, X = col
    pair<int, int> pos = findFoodLocation(vec);
    int foodY = pos.first;  // row
    int foodX = pos.second; // col

    int row = vec.size();
    int col = vec[0].size();

    while (snakeYpos != foodY) // vertical move
    {
        int currXpos = snakeXpos;
        int currYpos = snakeYpos;

        if (snakeYpos > foodY && direction == 'D')
        {
            if (snakeXpos > foodX)
                direction = 'L';
            else if (snakeXpos < foodX)
                direction = 'R';
            else
            {
                currXpos = snakeXpos;
                if ((snakeXpos - 1) >= 0)
                {
                    direction = 'L';
                    snakeXpos--;
                }
                else if ((snakeXpos + 1) < col)
                {
                    direction = 'R';
                    snakeXpos++;
                }
            }

        }
        else if (snakeYpos < foodY && direction == 'U')
        {
            if (snakeXpos > foodX)
                direction = 'L';
            else if (snakeXpos < foodX)
                direction = 'R';
            else
            {
                currXpos = snakeXpos;
                if ((snakeXpos - 1) >= 0)
                {
                    direction = 'L';
                    snakeXpos--;
                }
                else if ((snakeXpos + 1) < col)
                {
                    direction = 'R';
                    snakeXpos++;
                }
            }
            
        }
        else if (snakeYpos > foodY && (direction == 'R' || direction == 'L' || direction == 'U'))
        {
            snakeYpos--;
            direction = 'U';
        }
        else if (snakeYpos < foodY && (direction == 'R' || direction == 'L' || direction == 'D'))
        {
            snakeYpos++;
            direction = 'D';
        }

        vec[snakeYpos][snakeXpos] = 1;
        vec[currYpos][currXpos] = 0;
        printGrid(vec);
        this_thread::sleep_for(chrono::seconds(2));
        cout << endl
             << endl;
    }

    while (snakeXpos != foodX) // horizontal move
    {
        int currXpos = snakeXpos;
        int currYpos = snakeYpos;

        if (snakeXpos > foodX && direction == 'R')
        {
            if (snakeYpos > foodY)
                direction = 'U';
            else if (snakeYpos < foodY)
                direction = 'D';
            else
            {
                currYpos = snakeYpos;
                if ((snakeYpos - 1) >= 0)
                {
                    direction = 'U';
                    snakeYpos--;
                }
                else if ((snakeYpos + 1) < row)
                {
                    direction = 'D';
                    snakeYpos++;
                }
            }
            
        }
        else if (snakeXpos < foodX && direction == 'L')
        {
            if (snakeYpos > foodY)
                direction = 'U';
            else if (snakeYpos < foodY)
                direction = 'D';
            else
            {
                currYpos = snakeYpos;
                if ((snakeYpos - 1) >= 0)
                {
                    direction = 'U';
                    snakeYpos--;
                }
                else if ((snakeYpos + 1) < row)
                {
                    direction = 'D';
                    snakeYpos++;
                }
            }
           
        }
        else if (snakeXpos > foodX && (direction == 'D' || direction == 'U' || direction == 'L'))
        {
            snakeXpos--;
            direction = 'L';
        }
        else if (snakeXpos < foodX && (direction == 'D' || direction == 'U' || direction == 'R'))
        {
            snakeXpos++;
            direction = 'R';
        }

        vec[snakeYpos][snakeXpos] = 1;
        vec[currYpos][currXpos] = 0;
        printGrid(vec);
        this_thread::sleep_for(chrono::seconds(2));
        cout << endl
             << endl;
    }

    if (snakeXpos == foodX && snakeYpos == foodY)
    {
        cout << "Food eaten" << endl;
        foodAtRandomPos(vec);
    }
}

int main()
{
    srand(time(0));

    vector<vector<int>> vec = {{0, 0, 0, 0, 0},
                               {0, 0, 0, 0, 0},
                               {0, 0, 0, 0, 0},
                               {0, 0, 0, 0, 0},
                               {0, 0, 0, 0, 0}};

    int snakeXpos = 0, snakeYpos = 0;
    char direction = 'R';

    int firstCall = true;
    int i = 0;
    while (i < 1)
    {
        if (firstCall)
        {
            foodAtRandomPos(vec);
            firstCall = false;
        }
        snakeToFood(vec, snakeXpos, snakeYpos, direction);
    }
}
